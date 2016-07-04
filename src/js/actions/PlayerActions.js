/*
 * Actions file for PlayerStore
 *
 */

import dispatcher from "../dispatcher";

export function loadPlayersInLeagues(leagueIds) {
  dispatcher.dispatch({
    type: "PLAYER_STORE_LOAD_PLAYERS_IN_LEAGUES",
    leagueIds: leagueIds
  });
}
