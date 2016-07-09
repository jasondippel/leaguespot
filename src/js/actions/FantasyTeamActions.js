/*
 * Actions file for FantasyTeamStore
 *
 */

import dispatcher from "../dispatcher";

export function loadFantasyTeams(fleagueId) {
  dispatcher.dispatch({
    type: "FANTASY_TEAM_STORE_LOAD_FANTASY_TEAMS",
    fleagueId: fleagueId
  });
}

export function clearData() {
  dispatcher.dispatch({
    type: "FANTASY_TEAM_STORE_CLEAR_DATA"
  });
}
