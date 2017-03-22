/**
 * Roster for a given fantasy league
 */

/* Style Dependencies */
import './Roster.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../Store';
import { Sanitize } from '../../../utils/Sanitize';
import APIRequest from '../../../utils/APIRequest';
import * as leagueInfo from '../../../utils/ProLeagues';
import {
  fetchActiveFantasyLeague,
  addFantasyTeamToLeague,
  updateFantasyTeamRoster,
  updateFantasyTeamActiveRoster
} from '../../../actions/FantasyLeagueActions';
import FlatButton from '../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../leaguespot-components/components/buttons/RaisedButton';
import Popup from '../../../leaguespot-components/components/popup/Popup';
import Toast from '../../../leaguespot-components/components/toast/Toast';
import TextField from '../../../leaguespot-components/components/inputs/text/TextField';
import Section from '../../../leaguespot-components/components/containers/Section';
import Draft from './subSections/Draft';
import RosterManagement from './subSections/RosterManagement';


class Roster extends React.Component {
  constructor() {
    super();

    this.state = {
      fantasyLeague: null,
      myFantasyTeam: null,
      user: store.getState().user.user,
      showCreateTeamPopup: false,
      popupOpen: false,
      popupErrorMessage: '',
      toastOpen: false,
      toastMessage: '',
      toastType: 'DEFAULT',
      newTeamName: '',
      isDrafting: false,
      newRoster: {},
      newActiveRoster: {}
    }

    this.findUserFantasyTeam = this.findUserFantasyTeam.bind(this);

    store.subscribe(() => {
      let fantasyLeague = store.getState().fantasyLeague.activeFantasyLeague;
      let user = store.getState().user.user;
      let myFantasyTeam = this.findUserFantasyTeam(fantasyLeague.fantasy_teams, user.id);

      this.setState({
        fantasyLeague: fantasyLeague,
        myFantasyTeam: myFantasyTeam,
        newRoster: myFantasyTeam ? myFantasyTeam.roster : {},
        newActiveRoster: myFantasyTeam? myFantasyTeam.active_roster : {},
        user: user
      });
    });

    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleOpenToast = this.handleOpenToast.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
    this.handleCreateTeamNameChange = this.handleCreateTeamNameChange.bind(this);
    this.handleRosterSelectionChange = this.handleRosterSelectionChange.bind(this);
    this.handleActiveRosterChange = this.handleActiveRosterChange.bind(this);
    this.cancelDraftRoster = this.cancelDraftRoster.bind(this);
    this.displayCreateTeamPopup = this.displayCreateTeamPopup.bind(this);
    this.createFantasyTeam = this.createFantasyTeam.bind(this);
    this.submitUpdatedRoster = this.submitUpdatedRoster.bind(this);
    this.submitUpdatedActiveRoster = this.submitUpdatedActiveRoster.bind(this);
    this.renderCreateTeamPopupContent = this.renderCreateTeamPopupContent.bind(this);
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

  handleOpenPopup(popupOpenType) {
    let state = this.state;
    state[popupOpenType] = true;

    this.setState({
      ...state,
      popupOpen: true
    });
  }

  handleClosePopup() {
    this.setState({
      showCreateTeamPopup: false,
      popupOpen: false,
      popupErrorMessage: ''
    });
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

  handleCreateTeamNameChange(e, newValue) {
    this.setState({
      newTeamName: newValue
    });
  }

  handleRosterSelectionChange(newRoster) {
    this.setState({
      newRoster: Object.assign({}, newRoster)
    });
  }

  handleActiveRosterChange(newActiveRoster) {
    this.setState({
      newActiveRoster: Object.assign({}, newActiveRoster)
    });
  }

  cancelDraftRoster() {
    this.setState({
      isDrafting: false
    });
  }

  findUserFantasyTeam(fantasy_teams, userId) {
    let myFantasyTeam = null;

    Object.keys(fantasy_teams).map((teamId) => {
      let team = fantasy_teams[teamId];
      if(team.user_id === userId) {
        myFantasyTeam = team;
      }
    });

    return myFantasyTeam;
  }

  createFantasyTeam() {
    if (!this.state.newTeamName) {
      this.setState({
        popupErrorMessage: 'You must enter a valid team name first'
      });
      return;
    } else {
      this.setState({
        popupErrorMessage: ''
      });
    }

    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/fantasy_teams/create',
      data: {
        fleague_id: this.state.fantasyLeague.fleague_id,
        team_name: this.state.newTeamName
      }
    })
    .then((resp) => {
      if(resp.success) {
        // update store and state (may only have to update store, depends on how subscribe function works)
        this.props.dispatch(addFantasyTeamToLeague(resp.team, this.state.fantasyLeague.fleague_id));

        // show toast, close dialog
        this.handleOpenToast('SUCCESS', 'Your fantasy team was successfully created')
        this.handleClosePopup();
      }
      else {
        // update popup error message
        this.setState({
          popupErrorMessage: 'Failed to create fantasy team'
        });
        console.error('Failed to create fantasy team', resp.message);
      }
    })
    .catch((error) => {
      // update popup error message
      this.setState({
        popupErrorMessage: 'An error occurred while creating your fantasy team'
      });
      console.error('Error occurred while creating fantasy team', error);
    });
  }

  verifyRoster() {
    let acceptable = true;

    // check cost
    let rosterCost = 0;
    let maxRosterCost = this.state.fantasyLeague.settings.max_roster_size * leagueInfo.getPlayerCostForSport(this.state.fantasyLeague.sport);
    Object.keys(this.state.newRoster).map((playerId) => {
      rosterCost += parseInt(this.state.newRoster[playerId]['cost']);
    });

    if (maxRosterCost < rosterCost) {
      acceptable = false;
      this.handleOpenToast('ERROR', 'Roster cost exceeds maximum of $' + maxRosterCost);
    }

    // check roster size
    else if (this.state.fantasyLeague.settings.max_roster_size < Object.keys(this.state.newRoster).length) {
      acceptable = false;
      this.handleOpenToast('ERROR', 'Roster exceeds maximum size of ' + this.state.fantasyLeague.settings.max_roster_size);
    }

    else if (this.state.fantasyLeague.settings.max_roster_size > Object.keys(this.state.newRoster).length) {
      acceptable = false;
      this.handleOpenToast('ERROR', 'Roster still has empty spots! (' + (this.state.fantasyLeague.settings.max_roster_size - Object.keys(this.state.newRoster).length) + ')');
    }

    return acceptable;
  }

  verifyActiveRoster() {
    let acceptable = true;

    // check roster size
    if (leagueInfo.getMinRosterSize(this.state.fantasyLeague.sport) !== Object.keys(this.state.newActiveRoster).length) {
      acceptable = false;
      this.handleOpenToast('ERROR', 'Active roster must have ' + leagueInfo.getMinRosterSize(this.state.fantasyLeague.sport) + ' players');
    }

    return acceptable;
  }

  submitUpdatedRoster() {
    if(!this.verifyRoster()) {
      return;
    }

    this.props.dispatch(updateFantasyTeamRoster(this.state.myFantasyTeam.fteam_id, Object.assign({}, this.state.newRoster)));
  }

  submitUpdatedActiveRoster() {
    if(!this.verifyActiveRoster()) {
      return;
    }

    this.props.dispatch(updateFantasyTeamActiveRoster(this.state.myFantasyTeam.fteam_id, Object.assign({}, this.state.newActiveRoster)));
  }

  displayCreateTeamPopup() {
    let createTeamPopupContent = this.renderCreateTeamPopupContent();
    let buttons = [
      (
        <FlatButton
          label='Cancel'
          onClick={() => {
            this.setState({
              newTeamName: ''
            });
            this.handleClosePopup();
          }}
          />
      ),
      (
        <RaisedButton
          label='Create'
          type='primary'
          onClick={this.createFantasyTeam}
          />
      )
    ];
    let type = 'DEFAULT';
    let title = 'Create Team';

    return [type, title, createTeamPopupContent, buttons];
  }

  renderCreateTeamPopupContent() {
    return (
      <div>
        <div className='rosterPopupContent'>
          <div>
            Enter your desired team name below. This team name should be unique to your fantasy league.
          </div>

          <div className='errorMessage'>
            {this.state.popupErrorMessage}
          </div>

          <div className='column12'>
            <TextField
              floatingLabelFixed={true}
              floatingLabelText='Team Name'
              hintText='Enter Team Name'
              fullWidth={true}
              onChange={this.handleCreateTeamNameChange}
              value={this.state.newTeamName}
              />
          </div>
        </div>
      </div>
    );
  }

  renderCreateTeamComponent() {
    return (
      <div className='noFantasyTeam'>
        <div className='box'>
          <div className='mainText'>You haven't created a team yet!</div>
            <RaisedButton
              label='Create a Team'
              type='primary'
              onClick={() => {
                this.handleOpenPopup('showCreateTeamPopup');
              }}
              />
        </div>
      </div>
    );
  }

  renderNoRosterComponent() {
    let content;

    if (this.state.isDrafting) {
      // leagues, handleTeamChange, submitUpdatedRoster, cancelDraftRoster
      content = (
        <Draft
          teamName={this.state.myFantasyTeam.team_name}
          leagues={this.state.fantasyLeague.pro_leagues}
          sport={this.state.fantasyLeague.sport}
          maxRosterSize={Number(this.state.fantasyLeague.settings.max_roster_size)}
          cancelDraftRoster={this.cancelDraftRoster}
          handleRosterSelectionChange={this.handleRosterSelectionChange}
          submitUpdatedRoster={this.submitUpdatedRoster}
          />
      );
    } else {
      content = (
        <Section
          showBackground={true}
          >
          <div>
            <div className='sectionHeader'>
              <div className='left'>
                <div className='sectionTitle'>
                  {Sanitize(this.state.myFantasyTeam.team_name)}
                </div>
                <div className='sectionSubTitle'>My Fantasy Team</div>
              </div>
            </div>
            <div className='noPlayers'>
              <div className='box'>
                <div className='mainText'>Your team doesn't have any players!</div>
                  <RaisedButton
                    label='Draft Your Team'
                    type='primary'
                    onClick={() => {
                      this.setState({
                        isDrafting: true
                      });
                    }}
                    />
              </div>
            </div>
          </div>
        </Section>
      );
    }

    return content;
  }

  renderMyRosterComponent() {
    let enableUpdateBtn = Object.keys(this.state.myFantasyTeam.active_roster).toString() !== Object.keys(this.state.newActiveRoster).toString();
    return (
      <Section
        showBackground={true}
        >
        <div>
          <div className='sectionHeader'>
            <div className='left'>
              <div className='sectionTitle'>
                {Sanitize(this.state.myFantasyTeam.team_name)}
              </div>
              <div className='sectionSubTitle'>My Fantasy Team</div>
            </div>

            <div className='right'>
              <RaisedButton
                label='Update'
                type={enableUpdateBtn ? 'secondary' : 'disabled'}
                disabled={enableUpdateBtn}
                onClick={this.submitUpdatedActiveRoster}
                />
            </div>
          </div>
          <RosterManagement
            fantasyTeam={Object.assign({}, this.state.myFantasyTeam)}
            activeRoster={Object.assign({}, this.state.newActiveRoster)}
            sport={this.state.fantasyLeague.sport}
            handleActiveRosterChange={this.handleActiveRosterChange}
            submitUpdatedActiveRoster={this.submitUpdatedActiveRoster}
            />
        </div>
      </Section>
    );
  }

  render() {
    let content;
    if (!this.state.fantasyLeague || this.state.fantasyLeague.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    } else if (!this.state.myFantasyTeam) {
      content = this.renderCreateTeamComponent();
    } else if (Object.keys(this.state.myFantasyTeam.roster).length === 0) {
      content = this.renderNoRosterComponent();
    } else {
      content = this.renderMyRosterComponent();
    }

    let popupType = 'DEFAULT',
        popupTitle = '',
        popupMessage = '',
        popupButtons = [];

    if (this.state.popupOpen) {
      if (this.state.showCreateTeamPopup) {
        [popupType, popupTitle, popupMessage, popupButtons] = this.displayCreateTeamPopup();
      }
    }

    return (
      <div className='rc-Roster'>

        <div className='content'>
          {content}
        </div>

        <Popup
          open={this.state.popupOpen}
          type={popupType}
          title={popupTitle}
          message={popupMessage}
          onClose={this.handleClosePopup}
          buttons={popupButtons}
          />

        <Toast
          open={this.state.toastOpen}
          type={this.state.toastType}
          message={this.state.toastMessage}
          onClose={this.handleCloseToast}
          />
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Roster)
