/**
 * This file provides basic javascript functions that return fixed data about
 * professional leagues.
 *
 */

const sports = ['Basketball', 'Hockey'];

const proLeaguesInSport = {
  Basketball: ['nba', 'wnba', 'ncaambd1'],
  Hockey: ['nhl', 'ohl', 'qmjhl', 'whl', 'nwhl', 'cwhl']
}

const maxRosterSizeBySport = {
  Basketball: 15,
  Hockey: 23
}

const minRosterSizeBySport = {
  BasketBall: 5,
  Hockey: 6
}

const activeRosterSizeBySport = {
  BasketBall: 5,
  Hockey: 6
}

const leagueNames = {
  nba: 'NBA',
  wnba: 'WNBA',
  ncaambd1: 'NCAA MB',
  nhl: 'NHL',
  ohl: 'OHL',
  qmjhl: 'QMJHL',
  whl: 'WHL',
  cwhl: 'CWHL',
  nwhl: 'NWHL'
}

const fullLeagueNames = {
  nba: 'National Basketball Association',
  wnba: 'Womens National Basketball Association',
  ncaambd1: 'NCAA Mens Basketball',
  nhl: 'National Hockey League',
  ohl: 'Ontario Hockey League',
  qmjhl: 'Quebec Major Junior Hockey League',
  whl: 'Western Hockey League',
  nwhl: 'National Womens Hockey League',
  cwhl: 'Canadian Womens Hockey League'
}


export function getSports() {
  return sports;
}

export function getLeaguesInSport(sport) {
  if (proLeaguesInSport[sport]) {
    // return SHALLOW COPY of array
    return proLeaguesInSport[sport].slice(0);
  }

  console.error('Error: cannot find sport \"' + sport + '\" in list of sports');
  return [];
}

export function getLeagueName(leagueId) {
  return leagueNames[leagueId];
}

export function getMaxRosterSize(sport) {
  if(maxRosterSizeBySport[sport]) return maxRosterSizeBySport[sport];

  console.error('Error: max roster size not defined for ' + sport);
  return 0;
}

export function getMinRosterSize(sport) {
  if(minRosterSizeBySport[sport]) return minRosterSizeBySport[sport];

  console.error('Error: min roster size not defined for ' + sport);
  return 0;
}

export function getActiveRosterSize(sport) {
  if(activeRosterSizeBySport[sport]) return activeRosterSizeBySport[sport];

  console.error('Error: active roster size not defined for ' + sport);
  return 0;
}
