/**
 * Component that displays team drafting options
 */

/* Style Dependencies */
import './RosterManagement.less';

/* Script Dependencies */
import _ from 'underscore';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../../store';
import { Sanitize } from '../../../../utils/Sanitize';
import * as leagueInfo from '../../../../utils/ProLeagues';
import FlatButton from '../../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../../leaguespot-components/components/buttons/RaisedButton';
import IconButton from '../../../../leaguespot-components/components/buttons/IconButton';
import Section from '../../../../leaguespot-components/components/containers/Section';
import Popup from '../../../../leaguespot-components/components/popup/Popup';
import Toast from '../../../../leaguespot-components/components/toast/Toast';
import List from '../../../../leaguespot-components/components/lists/List';
import PlayerListItem from '../../../../leaguespot-components/components/lists/PlayerListItem';
import Spinner from '../../../../components/loaders/Spinner';


class RosterManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fantasyTeam: props.fantasyTeam,
      sport: props.sport,
      roster: props.fantasyTeam.roster,
      activeRoster: props.fantasyTeam.active_roster,
      loadingTeam: false,
      toastOpen: false,
      toastMessage: '',
      toastType: 'DEFAULT',
      popupOpen: false,
      popupType: 'DEFAULT',
      popupTitle: '',
      popupMessage: '',
      popupButtons: []
    };

    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleOpenToast = this.handleOpenToast.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
    this.addPlayerToActiveRoster = this.addPlayerToActiveRoster.bind(this);
    this.removePlayerFromActiveRoster = this.removePlayerFromActiveRoster.bind(this);
  }

  handleOpenToast(type, message) {
    this.setState({
      toastOpen: true,
      toastType: type,
      toastMessage: message
    });
  }

  handleCloseToast() {
    this.setState({
      toastOpen: false
    });
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

  addPlayerToActiveRoster(player) {
    let newActiveRosterObj = this.state.activeRoster;
    newActiveRosterObj[player.ls_id] = player;

    this.setState({
      activeRoster: newActiveRosterObj
    });

    this.props.handleActiveRosterChange(newActiveRosterObj);
  }

  removePlayerFromActiveRoster(player) {
    let newActiveRosterObj = this.state.activeRoster;
    delete newActiveRosterObj[player.ls_id];

    this.setState({
      activeRoster: newActiveRosterObj
    });

    this.props.handleActiveRosterChange(newActiveRosterObj);
  }

  formatActivePlayerStats(player) {
    let playerStats = [];
    let statFields = leagueInfo.getShortDisplayStatsForSport(this.state.sport);

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

  formatPlayerStats(player) {
    let playerStats = [];
    let statFields = leagueInfo.getGeneralDisplayStatsForSport(this.state.sport);

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
    let buttons = [
      (
        <IconButton
          type='removeCircle'
          hoverText='Remove from Active Roster'
          onClick={() => {
            this.removePlayerFromActiveRoster(player);
          }}/>
      )];
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
        buttons={buttons}
        />
    );
  }

  renderRosterListItem(player) {
    let buttons = [
      (
        <IconButton
          type='addCircle'
          hoverText='Add to Roster'
          onClick={() => {
            this.addPlayerToActiveRoster(player);
          }}/>
      )];

    if (this.state.activeRoster[player.ls_id] !== undefined) {
      buttons = [
        (
          <IconButton
            type='removeCircle'
            hoverText='Remove from Active Roster'
            onClick={() => {
              this.removePlayerFromActiveRoster(player);
            }}/>
        )];
    }
    let playerStats = this.formatPlayerStats(player);
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
        buttons={buttons}
        />
    );
  }

  renderFullRosterList() {
    let i = 0,
        listItems = [],
        rosterKeys = Object.keys(this.state.roster),
        playerList;

    for(i=0; i < rosterKeys.length; i++) {
      let listItem = this.renderRosterListItem(this.state.roster[rosterKeys[i]]);
      listItems.push(listItem);
    }

    return (
      <div>
        <List items={listItems} />
      </div>
    )
  }

  renderActiveRosterList(league) {
    let i = 0,
        listItems = [],
        activeRosterKeys = Object.keys(this.state.activeRoster),
        playerList;

    for(i=0; i < activeRosterKeys.length; i++) {
      let listItem = this.renderActiveRosterListItem(this.state.activeRoster[activeRosterKeys[i]]);
      listItems.push(listItem);
    }

    return (
      <div>
        <List items={listItems} />
      </div>
    )
  }

  renderFullRoster() {
    return this.renderFullRosterList();
  }

  renderActiveRoster() {
    return this.renderActiveRosterList();
  }

  render() {
    let fullRoster = this.renderFullRoster();
    let activeRoster = this.renderActiveRoster();

    return (
      <div className='rc-RosterManagement'>

        <div className='content'>
          <Section
            showBackground={false}
            >

            <div className='column8' style={{padding: '1em'}}>
              <Section
                title={'Bench'}
                colouredHeader={true}
                showBackground={true}
                noPadding={true}
                >
                {fullRoster}
              </Section>
            </div>

            <div className='column4' style={{padding: '1em'}}>
              <Section
                title={'Active'}
                colouredHeader={true}
                showBackground={true}
                noPadding={true}
                >
                {activeRoster}
              </Section>
            </div>

          </Section>
        </div>

        <Toast
          open={this.state.toastOpen}
          type={this.state.toastType}
          message={this.state.toastMessage}
          onClose={this.handleCloseToast}
          />

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

RosterManagement.displayName = 'RosterManagement';

const {any, array, bool, func, number, object, string} = React.PropTypes;

RosterManagement.propTypes = {
  fantasyTeam: object,
  sport: string,
  handleActiveRosterChange: func,
  submitUpdatedActiveRoster: func
};

RosterManagement.defaultProps = {
  handleActiveRosterChange: () => {},
  submitUpdatedActiveRoster: () => {}
};

export default connect(
  (state) => ({})
)(RosterManagement)
