/**
 * Component that displays team drafting options
 */

/* Style Dependencies */
import './Draft.less';

/* Script Dependencies */
import _ from 'underscore';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../../store';
import { Sanitize } from '../../../../utils/Sanitize';
import * as leagueInfo from '../../../../utils/ProLeagues';
import { fetchActiveFantasyLeague } from '../../../../actions/FantasyLeagueActions';
import { fetchPlayersForLeague } from '../../../../actions/PlayersActions';
import FlatButton from '../../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../../leaguespot-components/components/buttons/RaisedButton';
import IconButton from '../../../../leaguespot-components/components/buttons/IconButton';
import Section from '../../../../leaguespot-components/components/containers/Section';
import Tabs from '../../../../leaguespot-components/components/containers/Tabs';
import Popup from '../../../../leaguespot-components/components/popup/Popup';
import Toast from '../../../../leaguespot-components/components/toast/Toast';
import List from '../../../../leaguespot-components/components/lists/List';
import PlayerListItem from '../../../../leaguespot-components/components/lists/PlayerListItem';
import Spinner from '../../../../components/loaders/Spinner';


class Draft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fantasyTeam: undefined,
      roster: {},
      maxRosterSize: props.maxRosterSize,
      leagues: props.leagues,
      sport: props.sport,
      activeLeague: props.leagues[0],
      players: {},
      loadingPlayers: false,
      toastOpen: false,
      toastMessage: '',
      toastType: 'DEFAULT',
      popupOpen: false,
      popupType: 'DEFAULT',
      popupTitle: '',
      popupMessage: '',
      popupButtons: []
    };

    store.subscribe(() => {
      let players = store.getState().players.players;
      let loadingPlayers = store.getState().players.loading;

      this.setState({
        players: players,
        loadingPlayers: loadingPlayers
      });
    });

    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleOpenToast = this.handleOpenToast.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.showHelpPopup = this.showHelpPopup.bind(this);
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

  handleTabChange(activeTabValue) {
    this.setState({
      activeLeague: activeTabValue
    });
  }

  showHelpPopup() {
    let title = 'What You Need To Know';
    let type = 'DEFAULT';
    let buttons = [
      (
        <RaisedButton
          label='Close'
          type='primary'
          onClick={this.handleClosePopup} />
      )
    ];
    let content = (
      <div className='popupContent'>
        This is the help popup. I need to populate this with info once drafting process is created.
      </div>
    );

    this.handleOpenPopup(type, title, content, buttons);
  }

  formatPlayerStats(player) {
    let playerStats = [];
    let statFields = leagueInfo.getGeneralDisplayStatsForSport(this.state.sport);

    // filter to only include stats we want displayed
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

  renderPlayerListItem(player) {
    let buttons = [
      (
        <IconButton type='addCircle'/>
      )];
    let playerStats = this.formatPlayerStats(player);
    let playerHeader = (
      <div className='draftPlayerHeader'>
        <div className='playerName'>{player['last_name'] + ', ' + player['first_name'].slice(0,1)}</div>
        <div className='playerCost'>${player['cost']}</div>
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

  renderFullPlayerList(league) {
    let i = 0,
        listItems = [],
        playerList;

    // TODO: add filtering/searching stuff here

    for(i=0; i < this.state.players[league].length; i++) {
      let listItem = this.renderPlayerListItem(this.state.players[league][i]);
      listItems.push(listItem);
    }

    console.log('listItems', listItems);

    return (
      <div>
        <List items={listItems} />
      </div>
    )
  }

  renderTabContent(league) {
    let content = '';

    if (league === this.state.activeLeague) {
      if (!this.state.players[league] && !this.state.loadingPlayers) {
        this.props.dispatch(fetchPlayersForLeague(league));
      }

      if (!this.state.players[league] || this.state.loadingPlayers) {
        content = (
          <div>
            <Spinner />
          </div>
        );
      } else {
        content = this.renderFullPlayerList(league);
      }
    }

    return content;
  }

  renderTabs() {
    let tabs = [],
        i = 0;

    for(i=0; i < this.state.leagues.length; i++) {
      tabs[i] = {
        title: leagueInfo.getLeagueName(this.state.leagues[i]),
        value: this.state.leagues[i],
        content: this.renderTabContent(this.state.leagues[i])
      };
    }

    return tabs;
  }

  renderMyRoster() {
    if (Object.keys(this.state.roster).length === 0) {
      return (
        <div className='emptyRoster'>
          Empty
        </div>
      );
    }

    return (
      <div>
        TODO: display selected roster
      </div>
    );
  }

  render() {
    let tabs = this.renderTabs();
    let myRosterList = this.renderMyRoster();

    return (
      <div className='rc-Draft'>

        <div className='content'>
          <Section
            showBackground={true}
            >
            <div>
              <div className='sectionHeader'>
                <div className='left'>
                  <div className='sectionTitle'>
                    {Sanitize(this.props.teamName)}
                  </div>
                  <div className='sectionSubTitle'>Draft</div>
                </div>

                <div className='right'>
                  <FlatButton
                    label='Help'
                    onClick={this.showHelpPopup} />
                  <FlatButton
                    label='Back to My Roster'
                    onClick={this.props.cancelDraftRoster} />
                </div>
              </div>
            </div>

            <div className='infoPanel'>
              <div className='left'></div>
              <div className='right'>
                <div className='pair'>
                  <span className='label'>Remaining Budget</span>
                  <span className='value'>${this.state.maxRosterSize * leagueInfo.getPlayerCostForSport(this.state.sport)}</span>
                </div>
                <div className='pair'>
                  <span className='label'>Avg Player Cost</span>
                  <span className='value'>$0</span>
                </div>
              </div>
            </div>

            <div className='column8' style={{padding: '1em'}}>
              <Tabs
                tabs={tabs}
                onChange={this.handleTabChange}
                showBackground={true}
                />
            </div>

            <div className='column4' style={{padding: '1em'}}>
              <Section
                title='My Roster'
                colouredHeader={true}
                showBackground={true}
                >
                {myRosterList}
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

Draft.displayName = 'Draft';

const {any, array, bool, func, number, string} = React.PropTypes;

Draft.propTypes = {
  teamName: string,
  leagues: array,
  maxRosterSize: number,
  cancelDraftRoster: func,
  handleRosterSelectionChange: func,
  submitUpdatedRoster: func
};

Draft.defaultProps = {
  cancelDraftRoster: () => {},
  handleRosterSelectionChange: () => {},
  submitUpdatedRoster: () => {}
};

export default connect(
  (state) => ({})
)(Draft)
