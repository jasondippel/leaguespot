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

export function loadActiveFantasyLeague(fleagueId) {
  dispatcher.dispatch({
    type: "FANTASY_LEAGUE_STORE_LOAD_ACTIVE_FANTASY_LEAGUE",
    fleagueId: fleagueId
  });
}
