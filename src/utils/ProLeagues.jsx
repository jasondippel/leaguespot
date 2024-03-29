/**
 * This file provides basic javascript functions that return fixed data about
 * professional leagues.
 *
 */

const sports = ['Hockey'];

const proLeaguesInSport = {
  Basketball: ['nba', 'wnba', 'ncaambd1'],
  Hockey: ['nhl', 'ohl', 'lhjmq', 'whl', 'cwhl']
}

const sportEndDates = {
  Hockey: new Date('2017-04-30T23:59:59')
}

const positionsInSport = {
  Hockey: [
    'RW',
    'C',
    'LW',
    'D',
    'G'
  ]
}

const playerCostBySport = {
  Hockey: 950,
  Basketball: 800
}

const statNames = {
  position: 'Position',
  league: 'League',
  games_played: 'Games Played',
  goals: 'Goals',
  assists: 'Assists',
  points: 'Points',
  plusminus: 'Plus/Minus',
  ppg: 'Power Play Goals',
  shg: 'Short Handed Goals',
  shots: 'Shots',
  pim: 'Penalty Minutes',
  saves: 'Saves',
  save_percentage: 'Save Percentage',
  goals_against_average: 'Goals Against Average',
  wins: 'Wins',
  losses: 'Losses',
  shutouts: 'Shutouts',
  min: 'Minutes'
}

const statShortForm = {
  position: 'Pos',
  league: 'Leag',
  cost: 'Cost',
  games_played: 'GP',
  goals: 'G',
  assists: 'A',
  points: 'PTS',
  plusminus: '+/-',
  pim: 'PIM',
  ppg: 'PPG',
  shg: 'SHG',
  shots: 'Shots',
  saves: 'Saves',
  save_percentage: 'SV%',
  goals_against_average: 'GAA',
  wins: 'W',
  losses: 'L',
  shutouts: 'SO',
  min: 'Min'
}

const displayStats = {
  Hockey: [
    'position',
    'league',
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

const shortDisplayStats = {
  Hockey: [
    'league',
    'position',
    'points',
    'save_percentage'
  ]
}

const personalInfoStats = {
  Hockey: [
    'league',
    'position',
    'cost',
    'handiness',
    'height',
    'weight'
  ]
}

const playerStats = {
  Hockey: [
    'games_played',
    'goals',
    'assists',
    'points',
    'plusminus',
    'pim',
    'ppg',
    'shg',
    'wins',
    'losses',
    'save_percentage',
    'goals_against_average',
    'shutouts'
  ]
}

const personalInfoStatsNames = {
  'league': 'League',
  'position': 'Position',
  'height': 'Height (ft)',
  'weight': 'Weight (lbs)',
  'handiness': 'Handedness',
  'cost': 'Cost'
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

export function getPositionsInSport(sport) {
  if (positionsInSport[sport]) {
    // return SHALLOW COPY of array
    return positionsInSport[sport].slice(0);
  }

  console.error('Error: cannot find positions for sport \"' + sport + '\"');
  return [];
}

export function getSportEndDate(sport) {
  if (sportEndDates[sport]) {
    let today = new Date();
    let endDate = sportEndDates[sport].setFullYear(today.getFullYear());

    if (endDate < today) {
      endDate.setFullYear(today.getFullYear() + 1);
    }

    return endDate;
  }

  console.error('Error: cannot find endDate for sport \"' + sport + '\" in list of end dates');
  return;
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

export function getPersonalInfoStats(sport) {
  if (personalInfoStats[sport]) {
    return personalInfoStats[sport];
  }

  console.error('Error: cannot find personal info stats for sport \"' + sport + '\"');
  return [];
}

export function getAllPlayerStats(sport) {
  if (playerStats[sport]) {
    return playerStats[sport];
  }

  console.error('Error: cannot find player stats for sport \"' + sport + '\"');
  return [];
}

export function getGeneralDisplayStatsForSport(sport) {
  if (displayStats[sport]) {
    return displayStats[sport];
  }

  console.error('Error: cannot find general display stats for sport \"' + sport + '\"');
  return [];
}

export function getShortDisplayStatsForSport(sport) {
  if (shortDisplayStats[sport]) {
    return shortDisplayStats[sport];
  }

  console.error('Error: cannot find short display stats for sport \"' + sport + '\"');
  return [];
}

export function getNamesForStat(stat) {
  if (statNames[stat]) {
    return statNames[stat];
  }

  console.error('Error: cannot find name for stat \"' + stat + '\"');
  return '';
}

export function getNameForPersonalInfoStat(stat) {
  if (personalInfoStatsNames[stat]) {
    return personalInfoStatsNames[stat];
  }

  console.error('Error: cannot find name for personal info stat \"' + stat + '\"');
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
