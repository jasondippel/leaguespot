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

export function addLeagueToMyLeagues(league) {
  dispatcher.dispatch({
    type: "FANTASY_LEAGUE_STORE_ADD_FANTASY_LEAGUE_TO_MY_LEAGUES",
    league: league
  });
}

export function setActiveFantasyLeagueById(leagueId) {
  dispatcher.dispatch({
    type: "FANTASY_LEAGUE_STORE_SET_ACTIVE_FANTASY_LEAGUE_BY_ID",
    leagueId: leagueId
  });
}

export function loadMyFantasyLeagues() {
  dispatcher.dispatch({
    type: "FANTASY_LEAGUE_STORE_LOAD_MY_FANTASY_LEAGUES",
  });
}

export function loadActiveFantasyLeague(fleagueId) {
  dispatcher.dispatch({
    type: "FANTASY_LEAGUE_STORE_LOAD_ACTIVE_FANTASY_LEAGUE",
    fleagueId: fleagueId
  });
}
