/**
 * Standings for a given fantasy league
 */

/* Style Dependencies */
import './Standings.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import { Sanitize } from '../../../utils/Sanitize';
import * as leagueInfo from '../../../utils/ProLeagues';
import { fetchActiveFantasyLeague } from '../../../actions/FantasyLeagueActions';
import FlatButton from '../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../leaguespot-components/components/buttons/RaisedButton';
import List from '../../../leaguespot-components/components/lists/List';
import TeamListItem from '../../../leaguespot-components/components/lists/TeamListItem';
import PlayerListItem from '../../../leaguespot-components/components/lists/PlayerListItem';
import Section from '../../../leaguespot-components/components/containers/Section';
import Popup from '../../../leaguespot-components/components/popup/Popup';
import Spinner from '../../../components/loaders/Spinner';


class Standings extends React.Component {
  constructor() {
    super();

    this.state = {
      fantasyLeague: undefined,
      selectedTeamId: undefined,
      popupOpen: false,
      popupTitle: '',
      popupMessage: '',
      popupButtons: [],
      popupType: 'DEFAULT'
    }

    store.subscribe(() => {
      let selectedTeamId = this.state.selectedTeamId;
      if (!selectedTeamId) {
        selectedTeamId = Object.keys(store.getState().fantasyLeague.activeFantasyLeague.fantasy_teams)[0];
      }

      this.setState({
        fantasyLeague: store.getState().fantasyLeague.activeFantasyLeague,
        selectedTeamId: selectedTeamId
      });
    });

    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);

  }

  componentWillMount() {
    // fetch active fantasy league
    this.props.dispatch(fetchActiveFantasyLeague(this.props.params.id));
  }

  componentWillReceiveProps(newProps) {
    if(this.state.fantasyLeague && this.state.fantasyLeague.fleague_id === newProps.params.id) {
      return;
    }

    this.props.dispatch(fetchActiveFantasyLeague(newProps.params.id));
  }

  handleOpenPopup(type, title, message, btns) {
    this.setState({
      popupOpen: true,
      popupType: type,
      popupTitle: title,
      popupMessage: message,
      popupButtons: btns
    });
  }

  handleClosePopup() {
    this.setState({
      popupOpen: false
    });
  }

  formatActivePlayerStats(player) {
    let playerStats = [];
    let statFields = leagueInfo.getGeneralDisplayStatsForSport(this.state.fantasyLeague.sport);

    let i;
    for(i=0; i < statFields.length; i++) {
      if (player[statFields[i]] === null) {
        continue;
      }

      let statObj = {
        value: player[statFields[i]],
        fieldName: leagueInfo.getShortFormForStat(statFields[i])
      };
      playerStats.push(statObj);
    }

    return playerStats;
  }

  renderActiveRosterListItem(player) {
    let playerStats = this.formatActivePlayerStats(player);
    let playerHeader = (
      <div className='rosterPlayerHeader'>
        <div className='playerName'>{player['last_name'] + ', ' + player['first_name'].slice(0,1)}</div>
      </div>
    );

    return (
      <PlayerListItem
        playerHeader={playerHeader}
        playerStats={playerStats}
        showProfilePic={true}
        />
    );
  }

  renderTeamListItem(team, position) {
    return (
      <TeamListItem
        teamName={Sanitize(team['team_name'])}
        points={team['points']}
        position={position}
        />
    );
  }

  renderSelectedTeamActiveRosterList() {
    let i = 0,
        listItems = [],
        activeRosterKeys = Object.keys(this.state.fantasyLeague.fantasy_teams[this.state.selectedTeamId].active_roster),
        activeRoster = this.state.fantasyLeague.fantasy_teams[this.state.selectedTeamId].active_roster,
        playerList;

    for(i=0; i < activeRosterKeys.length; i++) {
      let listItem = this.renderActiveRosterListItem(activeRoster[activeRosterKeys[i]]);
      listItems.push(listItem);
    }

    return (
      <div>
        <List items={listItems} />
      </div>
    )
  }

  renderTeamList() {
    let i = 0,
        listItems = [],
        teamKeys = Object.keys(this.state.fantasyLeague.fantasy_teams),
        positionLabel = '1st',
        position = 1,
        playerList;

    for(i=0; i < teamKeys.length; i++, position++) {
      let currentTeam = this.state.fantasyLeague.fantasy_teams[teamKeys[i]];

      // determine position
      if (i > 0) {
        let previousTeam = this.state.fantasyLeague.fantasy_teams[teamKeys[i-1]];

        if (currentTeam.points < previousTeam.points) {
          if ( (position - 1) % 10 === 0) {
            positionLabel = position + 'st';
          } else if ( (position - 2) % 10 === 0) {
            positionLabel = position + 'nd';
          } else if ( (position - 3) % 10 === 0) {
            positionLabel = position + 'rd';
          } else {
            positionLabel = position + 'th';
          }
        }
      }

      let listItem = this.renderTeamListItem(currentTeam, positionLabel);
      listItems.push(listItem);
    }

    return (
      <div>
        <List items={listItems} />
      </div>
    )
  }

  renderSelectedTeamActiveRoster() {
    return this.renderSelectedTeamActiveRosterList();
  }

  render() {
    if (!this.state.fantasyLeague || this.state.fantasyLeague.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    let teamList = this.renderTeamList();
    let selectedTeamActiveRoster = (
      <Spinner />
    );

    if (this.state.selectedTeamId) {
      selectedTeamActiveRoster = this.renderSelectedTeamActiveRosterList();
    }

    return (
      <div className='rc-Standings'>

        <Section
          showBackground={true}
          >
          <div>
            <div className='sectionHeader'>
              <div className='left'>
                <div className='sectionTitle'>
                  Team Standings
                </div>
              </div>
            </div>

            <div className='column6' style={{padding: '1em'}}>
              <Section
                title={'Standings'}
                colouredHeader={true}
                showBackground={true}
                noPadding={true}
                >
                {teamList}
              </Section>
            </div>

            <div className='column6' style={{padding: '1em'}}>
              <Section
                title={'Selected Team Name'}
                subTitle={'Active Roster'}
                colouredHeader={true}
                showBackground={true}
                noPadding={true}
                >
                {selectedTeamActiveRoster}
              </Section>
            </div>

          </div>
        </Section>

        <Popup
          open={this.state.popupOpen}
          type={this.state.popupType}
          title={this.state.popupTitle}
          message={this.state.popupMessage}
          onClose={this.handleClosePopup}
          buttons={this.state.popupButtons}
          />
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Standings)
