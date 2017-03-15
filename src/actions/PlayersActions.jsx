/**
 * Functions used to handle inbox contents
 */

import APIRequest from '../utils/APIRequest';


export function fetchPlayersForLeague(league) {
  return function(dispatch) {
    // update status in store
    dispatch({
      type: 'FETCH_PLAYERS',
      payload: {
        league: league
      }
    });

    APIRequest.get({
      api: 'LeagueSpot',
      apiExt: '/players/view_league/' + league
    })
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: 'FETCH_PLAYERS_FULFILLED',
          payload: {
            league: league,
            players: resp.players
          }
        });
      } else {
        dispatch({
          type: 'FETCH_PLAYERS_REJECTED',
          payload: {
            errorMessage: resp.message
          }
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_PLAYERS_ERROR',
        payload: {
          errorMessage: 'Error occurred while fetching players for ' + league
        }
      });
    });
  }
}
