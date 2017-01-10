/**
 * This file provides basic javascript functions that return fixed data about
 * professional leagues.
 *
 */

const sports = ['Basketball', 'Hockey'];

const proLeaguesInSport = {
  Basketball: ['nba', 'wnba', 'ncaambd1'],
  Hockey: ['nhl', 'ohl', 'nwhl']
}

const rosterSizeBySport = {
  Basketball: 15,
  Hockey: 20
}

const leagueNames = {
  nba: 'NBA',
  wnba: 'WNBA',
  ncaambd1: 'NCAA MB',
  nhl: 'NHL',
  ohl: 'OHL',
  nwhl: 'NWHL'
}

const fullLeagueNames = {
  nba: 'National Basketball Association',
  wnba: 'Womens National Basketball Association',
  ncaambd1: 'NCAA Mens Basketball',
  nhl: 'National Hockey League',
  ohl: 'Ontario Hockey League',
  nwhl: 'National Womens Hockey League'
}


export function getSports() {
  return sports;
}

export function getLeaguesInSport(sport) {
  if(proLeaguesInSport[sport]) return proLeaguesInSport[sport];

  console.error('Error: cannot find sport \"' + sport + '\" in list of sports');
  return [];
}

export function getLeagueName(leagueId) {
  return leagueNames[leagueId];
}

export function getRosterSize(sport) {
  if(rosterSizeBySport[sport]) return rosterSizeBySport[sport];

  console.error('Error: roster size not defined for ' + sport);
  return 0;
}
