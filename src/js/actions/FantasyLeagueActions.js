/*
 * Actions file for FantasyLeagueStore
 *
 */

import dispatcher from "../dispatcher";

export function setActiveFantasyLeague(league) {
  dispatcher.dispatch({
    type: "FANTASY_LEAGUE_STORE_SET_ACTIVE_FANTASY_LEAGUE",
    league: league
  });
}
