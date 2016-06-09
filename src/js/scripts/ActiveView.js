/**
 * This file provides basic javascript functions for checking states
 * such as which team/league is being viewed in the dashboard, etc.
 */

let LeagueSpotActiveViewingTeamNameKey = "LeagueSpot-active-viewing-team-name";
let LeagueSpotActiveViewingLeagueNameKey = "LeagueSpot-active-viewing-league-name";

export function setActiveViewingTeam (teamName) {
 localStorage.setItem(LeagueSpotActiveViewingTeamNameKey, teamName);
}

export function removeActiveViewingTeam () {
 localStorage.removeItem(LeagueSpotActiveViewingTeamNameKey);
}

export function getActiveViewingTeam () {
  return localStorage.getItem(LeagueSpotActiveViewingTeamNameKey);
}

export function setActiveViewingLeague (leagueName) {
 localStorage.setItem(LeagueSpotActiveViewingLeagueNameKey, leagueName);
}

export function removeActiveViewingLeague () {
 localStorage.removeItem(LeagueSpotActiveViewingLeagueNameKey);
}

export function getActiveViewingLeague () {
  return localStorage.getItem(LeagueSpotActiveViewingLeagueNameKey);
}
