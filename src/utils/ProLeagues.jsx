/**
 * This file provides basic javascript functions that return fixed data about
 * professional leagues.
 *
 */

const sports = ['Hockey'];

const proLeaguesInSport = {
  Basketball: ['nba', 'wnba', 'ncaambd1'],
  Hockey: ['nhl', 'ohl', 'lhjmq', 'whl', 'nwhl', 'cwhl']
}

const playerCostBySport = {
  Hockey: 800,
  Basketball: 800
}

const statNames = {
  position: 'Position',
  games_played: 'Games Played',
  goals: 'Goals',
  assists: 'Assists',
  points: 'Points',
  plusminus: 'Plus/Minus',
  pim: 'Penalty Minutes',
  saves: 'Saves',
  save_percentage: 'Save Percentage',
  goals_against_average: 'Goals Against Average',
  wins: 'Wins',
  losses: 'Losses',
  shutouts: 'Shutouts'
}

const statShortForm = {
  position: 'Pos',
  games_played: 'GP',
  goals: 'G',
  assists: 'A',
  points: 'PTS',
  plusminus: '+/-',
  pim: 'PIM',
  saves: 'Saves',
  save_percentage: 'Save %',
  goals_against_average: 'GAA',
  wins: 'W',
  losses: 'L',
  shutouts: 'SO'
}

const displayStats = {
  Hockey: [
    'position',
    'games_played',
    'goals',
    'assists',
    'points',
    'plusminus',
    'pim',
    'save_percentage',
    'goals_against_average',
    'wins',
    'losses',
    'shutouts'
  ]
}

const statMultipliersBySport = {
  Hockey: {
    goals: 5,
    assists: 3,
    plusminus: 1,
    pim: -1,
    saves: 2,
    save_percentage: 3
  }
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
  lhjmq: 'QMJHL',
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
  lhjmq: 'Quebec Major Junior Hockey League',
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

export function getPlayerCostForSport(sport) {
  if (playerCostBySport[sport]) {
    return playerCostBySport[sport];
  }

  console.error('Error: cannot find average player cost for sport \"' + sport + '\"');
  return 500;
}

export function getStatsForSport(sport) {
  if (statMultipliersBySport[sport]) {
    return Object.assign({}, statMultipliersBySport[sport]);
  }

  console.error('Error: cannot find multipliers for sport \"' + sport + '\"');
  return {};
}

export function getGeneralDisplayStatsForSport(sport) {
  if (displayStats[sport]) {
    return displayStats[sport];
  }

  console.error('Error: cannot find general display stats for sport \"' + sport + '\"');
  return [];
}

export function getNamesForStat(stat) {
  if (statNames[stat]) {
    return statNames[stat];
  }

  console.error('Error: cannot find name for stat \"' + stat + '\"');
  return '';
}

export function getShortFormForStat(stat) {
  if (statShortForm[stat]) {
    return statShortForm[stat];
  }

  console.error('Error: cannot find short form for stat \"' + stat + '\"');
  return '';
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
