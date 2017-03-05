/**
 * Info for a given fantasy league
 */

/* Style Dependencies */
import './Info.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import APIRequest from '../../../utils/APIRequest';
import { Sanitize } from '../../../utils/Sanitize';
import * as leagueInfo from '../../../utils/ProLeagues';
import { fetchActiveFantasyLeague, addInvitedEmails } from '../../../actions/FantasyLeagueActions';
import FlatButton from '../../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../../leaguespot-components/components/buttons/RaisedButton';
import Section from '../../../leaguespot-components/components/containers/Section';
import Chip from '../../../leaguespot-components/components/chips/Chip';
import TextField from '../../../leaguespot-components/components/inputs/text/TextField';
import Toast from '../../../leaguespot-components/components/toast/Toast';
import InviteUsers from '../NewFantasyLeagueSteps/InviteUsers';
import { validateEmail } from '../../../utils/Validate';


class Info extends React.Component {
  constructor() {
    super();

    this.state = {
      fantasyLeague: null,
      user: null,
      inviteEmails: [],
      currentEmail: '',
      inputError: '',
      toastOpen: false,
      toastMessage: '',
      toastType: 'DEFAULT'
    }

    store.subscribe(() => {
      this.setState({
        fantasyLeague: store.getState().fantasyLeague.activeFantasyLeague,
        user: store.getState().user.user
      });
    });

    this.addEmailAddress = this.addEmailAddress.bind(this);
    this.removeEmailAddress = this.removeEmailAddress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.submitEmailAddress = this.submitEmailAddress.bind(this);
    this.updateEnteredEmail = this.updateEnteredEmail.bind(this);
    this.inviteUsers = this.inviteUsers.bind(this);
    this.handleOpenToast = this.handleOpenToast.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
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

  handleDeleteLeague() {

  }

  handleLeaveLeague() {

  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.submitEmailAddress();
    }
  }

  updateEnteredEmail(e, newValue) {
    this.setState({
      currentEmail: newValue
    });
  }

  submitEmailAddress() {
    if(!validateEmail(this.state.currentEmail)) {
      this.setState({
        inputError: 'Invalid email'
      });
      return;
    }

    console.log('jaso test');

    if(Object.keys(this.state.fantasyLeague.invited_users).indexOf(this.state.currentEmail) >= 0) {
      this.setState({
        inputError: 'User has already been invited'
      });
      return;
    }

    if(Object.keys(this.state.fantasyLeague.users).indexOf(this.state.currentEmail) >= 0) {
      this.setState({
        inputError: 'User is already a member'
      });
      return;
    }

    this.addEmailAddress(this.state.currentEmail);
    this.setState({
      currentEmail: '',
      inputError: undefined
    });
  }

  addEmailAddress(email) {
    let inviteEmails = this.state.inviteEmails;
    inviteEmails.push(email);
    this.setState({
      inviteEmails: inviteEmails
    });
  }

  removeEmailAddress(index) {
    let inviteEmails = this.state.inviteEmails;
    inviteEmails.splice(index, 1);
    this.setState({
      inviteEmails: inviteEmails
    });
  }

  inviteUsers() {
    if(this.state.inviteEmails.length === 0) {
      return;
    }

    let inviteEmails = this.state.inviteEmails;
    let memberEmails = Object.keys(this.state.fantasyLeague.users);
    let existingInviteList = Object.keys(this.state.fantasyLeague.invited_users);

    inviteEmails.filter((inviteEmail) => {
      let keep = true;

      // if existing member
      if (memberEmails.includes(inviteEmail)) {
        keep = false;
      }
      // if already in invite list
      else if (existingInviteList.indexOf(inviteEmail) >= 0) {
        keep = false;
      }

      return keep;
    });

    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/fantasy_leagues/invite',
      data: {
        fleague_id  : this.state.fantasyLeague.fleague_id,
        emails      : inviteEmails
      }
    }).then((resp) => {
      if (resp.success) {
        // update fantasyLeague store
        this.props.dispatch(addInvitedEmails(inviteEmails));

        // clear list
        this.setState({
          inviteEmails: []
        });

        // show toast
        let message = 'Invited ' + inviteEmails.length + ' new members';
        if (inviteEmails.length === 1) {
          message = 'Invited 1 new member';
        }

        this.setState({
          toastOpen: true,
          toastMessage: message,
          toastType: 'SUCCESS'
        });
      }
      else {
        // show toast
        console.error('Failed to invite users', resp);
      }
    }).catch((error) => {
      // show toast
      alert('Error occurred inviting users');
      console.error('Error occurred inviting users', error);
    });
  }

  renderChip(email, index) {
    return (
      <Chip
        key={index}
        onRequestDelete={() => this.removeEmailAddress(index)}
      >
        {email}
      </Chip>
    );
  }

  renderDeleteButton() {
    let component = '';

    if (this.state.fantasyLeague && this.state.fantasyLeague.fleague_creator === this.state.user.id) {
      component = (
        <div className='column12' style={{marginTop: '1em'}}>
          <RaisedButton
            label='Delete League'
            type='warning'
            noPadding={true}
            />
        </div>
      );
    } else {
      component = (
        <div className='column12' style={{marginTop: '1em'}}>
          <RaisedButton
            label='Leave League'
            type='warning'
            noPadding={true}
            />
        </div>
      );
    }

    return component;
  }

  render() {
    if (!this.state.fantasyLeague || this.state.fantasyLeague.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    let button = this.renderDeleteButton();
    let leagueList = '';
    this.state.fantasyLeague.pro_leagues.map((league, index) => {
      let leagueName = leagueInfo.getLeagueName(league);
      if (index === 0) {
        leagueList += leagueName;
      } else {
        leagueList += ', ' + leagueName;
      }
    });
    let hometown = this.state.fantasyLeague.hometown ? this.state.fantasyLeague.hometown : 'n/a';
    let socialRules = this.state.fantasyLeague.social_rules ? this.state.fantasyLeague.social_rules : 'n/a';
    let buttonStyle = {
      verticalAlign: 'bottom',
      paddingBottom: '0.5em'
    };

    if (this.state.inputError) {
      buttonStyle['paddingBottom'] = '2.5em';
    }

    return (
      <div className='rc-Info'>

        <div className='content'>
          <Section
            title='General Info'
            width={4}
            showBackground={true}
            >
            <div className='column12'>
              <div className='labelTitle'>League Name</div>
              <div className='labelValue'>{Sanitize(this.state.fantasyLeague.fleague_name)}</div>
            </div>
            <div className='column12'>
              <div className='labelTitle'>Sport</div>
              <div className='labelValue'>{Sanitize(this.state.fantasyLeague.sport)}</div>
            </div>
            <div className='column12'>
              <div className='labelTitle'>Leagues</div>
              <div className='labelValue multiline'>{Sanitize(leagueList)}</div>
            </div>
            <div className='column12'>
              <div className='labelTitle'>Members</div>
              <div className='labelValue'>{Object.keys(this.state.fantasyLeague.users).length + ' (' +  Object.keys(this.state.fantasyLeague.invited_users).length + ' invited)'}</div>
            </div>
            {button}
          </Section>

          <Section
            title='Invite Users'
            width={8}
            showBackground={true}
            >
            <div>
              Enter the emails of users you would like to include in your league. If an email you entered does not currently have an account, we will send them an email.
            </div>

            <div className='existingEmails'>
              {this.state.inviteEmails.map(this.renderChip, this)}
            </div>

            <div className='column5'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='User email'
                hintText='user@email.com'
                onChange={this.updateEnteredEmail}
                onKeyDown={this.handleKeyDown}
                errorText={this.state.inputError}
                value={this.state.currentEmail}
                />
            </div>
            <div className='column7' style={buttonStyle}>
              <RaisedButton
                label='Add'
                onClick={this.submitEmailAddress}
                />
              <RaisedButton
                label='Invite'
                type={this.state.inviteEmails.length > 0 ? 'primary' : 'disabled'}
                disabled={this.state.inviteEmails.length === 0}
                onClick={this.inviteUsers}
                />
            </div>

          </Section>

          <Section className='section'
            title='Rules'
            width={12}
            showBackground={true}
            >
            <div className='column12'>
              <div className='labelTitle'>Hometown</div>
              <div className='labelValue'>{Sanitize(hometown)}</div>
            </div>
            <div className='column12'>
              <div className='labelTitle'>Max Roster Size</div>
              <div className='labelValue'>TODO</div>
            </div>
            <div className='column12'>
              <div className='labelTitle'>Active Roster Size</div>
              <div className='labelValue'>{leagueInfo.getActiveRosterSize(this.state.fantasyLeague.sport)}</div>
            </div>
            <div className='column12'>
              <div className='labelTitle full'>Social Rules</div>
              <div className='labelValue full multiline'>{Sanitize(socialRules)}</div>
            </div>
          </Section>

        </div>

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
)(Info)
