/**
 * Functions used to modify fantasy league object in store
 */

 import APIRequest from '../utils/APIRequest';


export function fetchMyFantasyLeagues() {
  return function(dispatch) {
    APIRequest.get({
        api: 'LeagueSpot',
        apiExt: '/fantasy_leagues/my_leagues'
      })
      .then((resp) => {
        if (resp.success) {
          dispatch({
            type: 'FETCH_MY_FANTASY_LEAGUES_FULFILLED',
            payload: {
              myFantasyLeagues: resp.leagues
            }
          });
        } else {
          dispatch({
            type: 'FETCH_MY_FANTASY_LEAGUES_REJECTED',
            payload: {
              errorMessage: resp.message
            }
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_MY_FANTASY_LEAGUES_ERROR',
          payload: {
            errorMessage: 'Error occurred while fetching your fantasy leagues'
          }
        });
      });
  }
}

export function fetchActiveFantasyLeague(fantasyLeagueId) {
  return function(dispatch, getState) {
    let state = getState();

    // check if already set as active league...
    if (state.fantasyLeague.activeFantasyLeague.fleague_id === fantasyLeagueId) {
      dispatch({
        type: 'FETCH_ACTIVE_FANTASY_LEAGUE_FULFILLED',
        payload: {
          activeFantasyLeague: state.fantasyLeague.activeFantasyLeague
        }
      });
    }

    APIRequest.get({
        api: 'LeagueSpot',
        apiExt: '/fantasy_leagues/view/'+fantasyLeagueId
      })
      .then((resp) => {
        if (resp.success) {
          dispatch({
            type: 'FETCH_ACTIVE_FANTASY_LEAGUE_FULFILLED',
            payload: {
              activeFantasyLeague: resp.league
            }
          });
        } else {
          dispatch({
            type: 'FETCH_ACTIVE_FANTASY_LEAGUE_REJECTED',
            payload: {
              errorMessage: resp.message
            }
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_ACTIVE_FANTASY_LEAGUE_ERROR',
          payload: {
            errorMessage: 'Error occurred while fetching active fantasy league'
          }
        });
      });
  }
}

export function updateFantasyTeamRoster(fteamId, newRoster) {
  return function(dispatch, getState) {
    dispatch({
      type: 'UPDATING_FANTASY_TEAM_ROSTER'
    });

    let newRosterMapping = {};
    Object.keys(newRoster).map((playerId) => {
      newRosterMapping[playerId] = playerId;
    });

    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/fantasy_teams/update',
      data: {
        fteam_id: fteamId,
        roster: newRosterMapping
      }
    })
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: 'UPDATING_FANTASY_TEAM_ROSTER_FULFILLED',
          payload: {
            fteamId: fteamId,
            newRoster: newRoster
          }
        });
      } else {
        dispatch({
          type: 'UPDATING_FANTASY_TEAM_ROSTER_REJECTED',
          payload: {
            errorMessage: resp.message
          }
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: 'UPDATING_FANTASY_TEAM_ROSTER_ERROR',
        payload: {
          errorMessage: 'Error occurred while updating fantasy team roster'
        }
      });
    });
  }
}

export function updateFantasyTeamActiveRoster(fteamId, newActiveRoster) {
  return function(dispatch, getState) {
    dispatch({
      type: 'UPDATING_FANTASY_TEAM_ACTIVE_ROSTER'
    });

    let newActiveRosterMapping = {};
    Object.keys(newActiveRoster).map((playerId) => {
      newActiveRosterMapping[playerId] = playerId;
    });

    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/fantasy_teams/update',
      data: {
        fteam_id: fteamId,
        active_roster: newActiveRosterMapping
      }
    })
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: 'UPDATING_FANTASY_TEAM_ACTIVE_ROSTER_FULFILLED',
          payload: {
            fteamId: fteamId,
            newActiveRoster: newActiveRoster
          }
        });
      } else {
        dispatch({
          type: 'UPDATING_FANTASY_TEAM_ACTIVE_ROSTER_REJECTED',
          payload: {
            errorMessage: resp.message
          }
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: 'UPDATING_FANTASY_TEAM_ACTIVE_ROSTER_ERROR',
        payload: {
          errorMessage: 'Error occurred while updating fantasy team active roster'
        }
      });
    });
  }
}

export function setActiveFantasyLeague(fantasyLeague) {
  return {
    type: 'SET_ACTIVE_FANTASY_LEAGUE',
    payload: {
      activeFantasyLeague: fantasyLeague
    }
  }
}

export function addFantasyTeamToLeague(team, fleagueId) {
  return {
    type: 'ADD_FANTASY_TEAM_TO_LEAGUE',
    payload: {
      fleagueId: fleagueId,
      team: team
    }
  }
}

export function addToMyFantasyLeagues(fantasyLeague) {
  return {
    type: 'ADD_TO_MY_FANTASY_LEAGUES',
    payload: {
      myFantasyLeague: fantasyLeague
    }
  }
}

export function removeFromMyFantasyLeagues(fleagueId) {
  return {
    type: 'REMOVE_FROM_MY_FANTASY_LEAGUES',
    payload: {
      fleagueId: fleagueId
    }
  }
}

export function addInvitedEmails(invitedEmails) {
  return {
    type: 'UPDATE_INVITED_ACTIVE_FANTASY_LEAGUE',
    payload: {
      invitedEmails: invitedEmails
    }
  }
}
