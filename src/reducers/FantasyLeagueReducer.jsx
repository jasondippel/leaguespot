/**
 * Reducer for fantasy league object in store
 */

const initialState = {
  myFantasyLeagues: [],
  activeFantasyLeague: {
    fleague_id: null,
    fleague_name: null,
    fleague_creator: null,
    registration_date: null,
    fleague_admins: {},
    sport: null,
    pro_leagues: [],
    contest_type: null,
    privacy_mode: null,
    league_size_limit: null,
    status: null,
    settings: {},
    users: {},
    invited_users: {},
    fantasy_teams: {},
    social_rules: null
  },
  loading: false,
  loadingTeam: false,
  errorMessage: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
      case 'FETCH_MY_FANTASY_LEAGUES': {
        return {...state, loading: true}
      }
      case 'FETCH_MY_FANTASY_LEAGUES_REJECTED': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_MY_FANTASY_LEAGUES_ERROR': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_MY_FANTASY_LEAGUES_FULFILLED': {
        return {
          ...state,
          loading: false,
          myFantasyLeagues: action.payload.myFantasyLeagues,
        }
      }
      case 'FETCH_ACTIVE_FANTASY_LEAGUE': {
        return {...state, loading: true}
      }
      case 'FETCH_ACTIVE_FANTASY_LEAGUE_REJECTED': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_ACTIVE_FANTASY_LEAGUE_ERROR': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_ACTIVE_FANTASY_LEAGUE_FULFILLED': {
        return {
          ...state,
          loading: false,
          activeFantasyLeague: action.payload.activeFantasyLeague,
        }
      }
      case 'SET_FANTASY_LEAGUE': {
        return {
          ...state,
          fantasyLeague: action.payload.fantasyLeague
        }
      }
      case 'ADD_TO_MY_FANTASY_LEAGUE': {
        return {
          ...state,
          myFantasyLeagues: [...state.myFantasyLeagues, action.payload.myFantasyLeague]
        }
      }
      case 'REMOVE_FROM_MY_FANTASY_LEAGUES': {
        let index = state.myFantasyLeagues.map((league) => {
          return league.fleague_id;
        }).indexOf(action.payload.fleagueId);
        let myFantasyLeagues = state.myFantasyLeagues.splice(index, 1);

        return {
          ...state,
          myFantasyLeagues: myFantasyLeagues
        }
      }
      case 'JOIN_FANTASY_LEAGUE': {
        return {
          ...state,
          myFantasyLeagues: [...state.myFantasyLeagues, action.payload.joinedFantasyLeague]
        }
      }
      case 'UPDATE_INVITED_ACTIVE_FANTASY_LEAGUE': {
        let inviteList = Object.keys(state.activeFantasyLeague.invited_users);
        let memberList = Object.keys(state.activeFantasyLeague.users);
        let newInvites = action.payload.invitedEmails;

        newInvites.filter((inviteEmail) => {
          let keep = true;
          // if existing member
          if (memberList.includes(inviteEmail)) {
            keep = false;
          }
          // if already in invite list
          else if (inviteList.indexOf(inviteEmail) >= 0) {
            keep = false;
          }

          return keep;
        });

        return {
          ...state,
          activeFantasyLeague: {
            ...state.activeFantasyLeague,
            invited_users: inviteList.concat(newInvites)
          }
        }
      }
      case 'ADD_FANTASY_TEAM_TO_LEAGUE': {
        let fleagueId = action.payload.fleagueId;
        let newTeam = action.payload.team;

        // ensure fleagueId matches that of the active league
        if (state.activeFantasyLeague.fleague_id !== fleagueId) {
          console.error('Trying to add team to league that is not active fantasy league; Id: ' + fleagueId);
          return state;
        }

        // add team to active fantasy league;
        let teamsList = state.activeFantasyLeague.fantasy_teams;
        teamsList[newTeam.fteam_id] = newTeam;

        return {
          ...state,
          activeFantasyLeague: {
            ...state.activeFantasyLeague,
            fantasy_teams: teamsList
          }
        }
      }
      case 'UPDATING_FANTASY_TEAM_ROSTER': {
        return {...state, loadingTeam: true}
      }
      case 'UPDATING_FANTASY_TEAM_ROSTER_FULFILLED': {
        let activeFantasyLeague = state.activeFantasyLeague;
        let teamsList = state.activeFantasyLeague.fantasy_teams;
        let updatedRoster = action.payload.newRoster;

        console.log('jason test');

        teamsList[action.payload.fteamId]['roster'] = updatedRoster;
        activeFantasyLeague['fantasy_teams'] = teamsList;
        return {
          ...state,
          loadingTeam: false,
          activeFantasyLeague: activeFantasyLeague
        }
      }
      case 'UPDATING_FANTASY_TEAM_ROSTER_REJECTED': {
        return {
          ...state,
          loadingTeam: false,
          errorMessage: action.payload.errorMessage
        }
      }
      case 'UPDATING_FANTASY_TEAM_ROSTER_ERROR': {
        return {
          ...state,
          loadingTeam: false,
          errorMessage: action.payload.errorMessage
        }
      }
    }

    return state
}
