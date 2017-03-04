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

export function setActiveFantasyLeague(fantasyLeague) {
  return {
    type: 'SET_ACTIVE_FANTASY_LEAGUE',
    payload: {
      activeFantasyLeague: fantasyLeague
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

export function addInvitedEmails(invitedEmails) {
  return {
    type: 'UPDATE_INVITED_ACTIVE_FANTASY_LEAGUE',
    payload: {
      invitedEmails: invitedEmails
    }
  }
}
