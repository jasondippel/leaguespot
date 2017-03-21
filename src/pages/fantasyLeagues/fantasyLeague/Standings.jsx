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
import PlayerInfo from './subSections/PlayerInfo';


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
    this.handlePlayerSelection = this.handlePlayerSelection.bind(this);
    this.handleTeamSelectionChange = this.handleTeamSelectionChange.bind(this);
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

  handlePlayerSelection(player) {
    let type = 'DEFAULT';
    let title = (
      <div className='playerTitle'>
        <div className='playerName'>
          <span className='name'>{player.last_name}, {player.first_name}</span>
          <span className='number'>#{player.jersey_number}</span>
        </div>
      </div>
    );

    let buttons = [(
      <RaisedButton
        label='Close'
        onClick={this.handleClosePopup}
        />
    )];
    let content = (
      <PlayerInfo
        player={player}
        sport={this.state.fantasyLeague.sport}
        />
    );

    this.handleOpenPopup(type, title, content, buttons);
  }

  handleTeamSelectionChange(newSelectedTeamId) {
    this.setState({
      selectedTeamId: newSelectedTeamId
    });
  }

  formatActivePlayerStats(player) {
    let playerStats = [];
    let statFields = leagueInfo.getGeneralDisplayStatsForSport(this.state.fantasyLeague.sport);

    let i;
    for(i=0; i < statFields.length; i++) {
      let value = player[statFields[i]];

      if (player[statFields[i]] === null) {
        continue;
      } else if (statFields[i] === 'league') {
        value = leagueInfo.getLeagueName(value);
      }

      let statObj = {
        value: value,
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
      <div key={player.ls_id}>
        <PlayerListItem
          playerHeader={playerHeader}
          playerStats={playerStats}
          showProfilePic={true}
          selectable={true}
          onSelect={() => {
            this.handlePlayerSelection(player);
          }}
          />
      </div>
    );
  }

  renderTeamListItem(team, position) {
    return (
      <div key={team.fteam_id}>
        <TeamListItem
          teamName={Sanitize(team['team_name'])}
          points={team['points']}
          position={position}
          selectable={true}
          active={team['fteam_id'] === this.state.selectedTeamId}
          onSelect={() => {
            this.handleTeamSelectionChange(team.fteam_id);
          }}
          />
      </div>
    );
  }

  renderSelectedTeamActiveRosterList() {
    let i = 0,
        listItems = [],
        activeRosterKeys = Object.keys(this.state.fantasyLeague.fantasy_teams[this.state.selectedTeamId].active_roster),
        activeRoster = this.state.fantasyLeague.fantasy_teams[this.state.selectedTeamId].active_roster,
        playerList;

    if (activeRosterKeys.length === 0) {
      return (
        <div className='emptyActiveTeam'>
          No Active Roster
        </div>
      );
    }

    for(i=0; i < activeRosterKeys.length; i++) {
      let listItem = this.renderActiveRosterListItem(activeRoster[activeRosterKeys[i]]);
      listItems.push(listItem);
    }

    // NOTE: can't render proper list due to bug in component (3rd party component bug)
    // TODO: update to render proper list once bug fixed
    return (
      <div>
        {listItems}
      </div>
    );
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

    // NOTE: can't render proper list due to bug in component (3rd party component bug)
    // TODO: update to render proper list once bug fixed
    return (
      <div>
        {listItems}
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

    let teamList = (
      <div className='emptyActiveTeam'>
        No Teams
      </div>
    );;
    let selectedTeamName = 'No Team Selected';
    let selectedTeamActiveRoster = (
      <div className='emptyActiveTeam'>
        No Active Roster
      </div>
    );

    if (this.state.selectedTeamId) {
      teamList = this.renderTeamList();
      selectedTeamActiveRoster = this.renderSelectedTeamActiveRosterList();
      selectedTeamName = Sanitize(this.state.fantasyLeague.fantasy_teams[this.state.selectedTeamId].team_name);
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

            <div className='column5' style={{padding: '1em'}}>
              <Section
                title={'Standings'}
                colouredHeader={true}
                showBackground={true}
                noPadding={true}
                >
                {teamList}
              </Section>
            </div>

            <div className='column7' style={{padding: '1em'}}>
              <Section
                title={selectedTeamName}
                subTitle={selectedTeamName ? 'Active Roster' : ''}
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
