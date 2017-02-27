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
    fantasy_teams: [],
    social_rules: null
  },
  loading: false,
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
    }

    return state
}
