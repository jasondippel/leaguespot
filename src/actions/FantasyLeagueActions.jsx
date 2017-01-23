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