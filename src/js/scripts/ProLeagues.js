/**
 * This file provides basic javascript functions that return fixed data about
 * professional leagues.
 *
 */

const sports = ['Basketball'];

const proLeaguesInSport = {
  Basketball: ['nba', 'wnba', 'ncaa_mb', 'ncaa_wb']
}

const leagueNames = {
  nba: 'NBA',
  wnba: 'WNBA',
  ncaa_mb: 'NCAA MB',
  ncaa_wb: 'NCAA WB'
}


export function getSports() {
  return sports;
}

export function getLeaguesInSport(sport) {
  if(proLeaguesInSport[sport]) return proLeaguesInSport[sport];

  console.error("Error: cannot find sport '" + sport + "' in list of sports");
  return [];
}

export function getLeagueName(leagueId) {
  return leagueNames[leagueId];
}
