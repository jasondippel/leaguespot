/**
 * Form to create a new fantasy league
 */

/* Style Dependencies */
import './NewFantasyLeague.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';
import store from '../store';
import { setActiveFantasyLeague, addToMyFantasyLeagues } from '../../actions/FantasyLeagueActions';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import Stepper from '../../leaguespot-components/components/stepper/Stepper';
import Section from '../../leaguespot-components/components/containers/Section';
import Toast from '../../leaguespot-components/components/toast/Toast';
import SmallBanner from '../../components/banners/SmallBanner';
import * as leagueInfo from '../../utils/ProLeagues';
import APIRequest from '../../utils/APIRequest';

/* Steps */
import SetupBasics from './NewFantasyLeagueSteps/SetupBasics';
import ModifySettings from './NewFantasyLeagueSteps/ModifySettings';
import InviteUsers from './NewFantasyLeagueSteps/InviteUsers';


class NewFantasyLeague extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();

    // default start cutoff date
    let cutOffDate = moment().add(1, 'days').hour(12).minute(30).second(0).toDate();

    this.state = {
      stepper: {
        currentStep: 0,
        stepNames: [
          'Setup league basics',
          'Modify league rules',
          'Invite users'
        ],
      },
      fantasyLeague: {
        name: '',
        sport: '',
        proLeagues: [],
        cutOffDate: cutOffDate,
        maxRosterSize: 0,
        hometown: undefined,
        userEmails: []
      },
      errorMessage: '',
      toastOpen: false
    };

    store.subscribe(() => {
      this.setState({
        fantasyLeague: {
          ...this.state.fantasyLeague,
          adminEmail: store.getState().user.user.email
        }
      });
    });

    this.getStepContent = this.getStepContent.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.verifyStepCompletion = this.verifyStepCompletion.bind(this);
    this.verifyCutOffDate = this.verifyCutOffDate.bind(this);
    this.verifyRosterSize = this.verifyRosterSize.bind(this);
    this.verifyHometown = this.verifyHometown.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleProLeaguesChange = this.handleProLeaguesChange.bind(this);
    this.handleCutOffDateChange = this.handleCutOffDateChange.bind(this);
    this.handleCutoffTimeChange = this.handleCutoffTimeChange.bind(this);
    this.handleMaxRosterSizeChange = this.handleMaxRosterSizeChange.bind(this);
    this.handleHometownChange = this.handleHometownChange.bind(this);
    this.addEmailAddress = this.addEmailAddress.bind(this);
    this.removeEmailAddress = this.removeEmailAddress.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
  }

  getStepContent() {
    let stepContent;

    switch (this.state.stepper.currentStep) {
      case 0:
        stepContent = (
          <SetupBasics
            name={this.state.fantasyLeague.name}
            sport={this.state.fantasyLeague.sport}
            proLeagues={this.state.fantasyLeague.proLeagues}
            handleNameChange={this.handleNameChange}
            handleSportChange={this.handleSportChange}
            handleProLeaguesChange={this.handleProLeaguesChange}
            />
        );
        break;
      case 1:
        stepContent = (
          <ModifySettings
            cutOffDate={this.state.fantasyLeague.cutOffDate}
            maxRosterSize={this.state.fantasyLeague.maxRosterSize}
            hometown={this.state.fantasyLeague.hometown}
            handleCutOffDateChange={this.handleCutOffDateChange}
            handleCutoffTimeChange={this.handleCutoffTimeChange}
            handleMaxRosterSizeChange={this.handleMaxRosterSizeChange}
            handleHometownChange={this.handleHometownChange} />
        );
        break;
      case 2:
        stepContent = (
          <InviteUsers
            userEmails={this.state.fantasyLeague.userEmails}
            addEmailAddress={this.addEmailAddress}
            removeEmailAddress={this.removeEmailAddress} />
        );
        break;
    }

    return (
      <div className='stepContainer'>
        <div className='stepTitle'>
          {this.state.stepper.stepNames[this.state.stepper.currentStep]}
        </div>

        {stepContent}

      </div>
    );
  }

  verifyStepCompletion() {
    let result = true;

    switch (this.state.stepper.currentStep) {
      case 0:
        if (!this.state.fantasyLeague.name ||
            !this.state.fantasyLeague.sport ||
            this.state.fantasyLeague.proLeagues.length === 0 ) {
          this.setState({
            errorMessage: 'Please enter all fields before continuing'
          });
          result = false;
        }
        break;
      case 1:
        if (!this.verifyCutOffDate() ||
            !this.verifyRosterSize() ||
            !this.verifyHometown() ) {
          result = false;
        }
        break;
      case 2:
        // email validation done before emails are added to list
        break;
    }

    if (result) {
      this.setState({
        errorMessage: ''
      });
    } else {
      this.setState({
        toastOpen: true
      });
    }

    return result;
  }

  verifyCutOffDate() {
    let result = true;
    let minStart = moment().add(30, 'minutes').toDate();
    if(this.state.fantasyLeague.cutOffDate < minStart) {
      this.setState({
        errorMessage: 'You must choose a cutoff date and time at least 30 minutes in the future.'
      });
      result = false;
    }

    return result;
  }

  verifyRosterSize() {
    let maxSize = leagueInfo.getMaxRosterSize(this.state.fantasyLeague.sport),
        minSize = leagueInfo.getMinRosterSize(this.state.fantasyLeague.sport),
        result = true;

    if (this.state.fantasyLeague.maxRosterSize < minSize ||
        this.state.fantasyLeague.maxRosterSize > maxSize) {
      this.setState({
        errorMessage: 'Max fantasy leagues size must be between ' + minSize + ' and ' + maxSize
      });
      result = false;
    }

    return result;
  }

  verifyHometown() {
    /* TODO: add validtaion */
    return true;
  }

  addEmailAddress(email) {
    let userEmails = this.state.fantasyLeague.userEmails;
    userEmails.push(email);
    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        userEmails: userEmails
      }
    });
  }

  removeEmailAddress(index) {
    let userEmails = this.state.fantasyLeague.userEmails;
    userEmails.splice(index, 1);
    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        userEmails: userEmails
      }
    });
  }

  handleNext() {
    if (this.state.stepper.currentStep === this.state.stepper.stepNames.length - 1) {
      if(confirm('Create new fantasy league?')) {
        this.submitNewFantasyLeague();
      }
    } else {
      if (this.verifyStepCompletion()) {
        this.setState({
          stepper: {...this.state.stepper, currentStep: this.state.stepper.currentStep + 1},
          toastErrorMessage: ''
        });
      } else {
        this.setState({
          toastErrorMessage: 'You must enter all fields before continuing'
        });
      }
    }
  }

  handlePrev() {
    if (this.state.stepper.currentStep === 0) {
      alert('You\'re at the first step already!');
    } else {
      this.setState({
        stepper: {...this.state.stepper, currentStep: this.state.stepper.currentStep - 1}
      });
    }
  }

  handleNameChange(e, name) {
    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        name: name
      }
    });
  }

  handleSportChange(e, key, sport) {
    if (sport === this.state.fantasyLeague.sport) {
      return;
    }

    // default to all pro leagues selected, max roster size
    let proLeagues = leagueInfo.getLeaguesInSport(sport);
    let maxRosterSize = leagueInfo.getMaxRosterSize(sport);

    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        sport: sport,
        proLeagues: proLeagues,
        maxRosterSize: maxRosterSize
      }
    });
  }

  handleProLeaguesChange(e, checked) {
    let proLeagues = this.state.fantasyLeague.proLeagues;
    let value = e.target.value;

    if (checked) {
      // add to list
      proLeagues.push(value);
    } else {
      // remove from list
      proLeagues.splice(proLeagues.indexOf(value), 1);
    }

    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        proLeagues: proLeagues
      }
    });
  }

  handleCutOffDateChange(date) {
    let oldCutOffDate = this.state.fantasyLeague.cutOffDate

    // create new cutOffDate; restore old selected time
    let newCutOffDate = moment(date);
    newCutOffDate = moment(newCutOffDate).hour(moment(oldCutOffDate).hour());
    newCutOffDate = moment(newCutOffDate).minute(moment(oldCutOffDate).minute());
    newCutOffDate = moment(newCutOffDate).second(moment(oldCutOffDate).second());

    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        cutOffDate: moment(newCutOffDate).toDate()
      }
    });
  }

  handleCutoffTimeChange(time) {
    let oldCutOffDate = this.state.fantasyLeague.cutOffDate

    // create new cutOffDate; restore old selected date
    let newCutOffDate = moment(time);
    newCutOffDate = moment(newCutOffDate).day(moment(oldCutOffDate).day());
    newCutOffDate = moment(newCutOffDate).month(moment(oldCutOffDate).month());
    newCutOffDate = moment(newCutOffDate).year(moment(oldCutOffDate).year());

    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        cutOffDate: moment(newCutOffDate).toDate()
      }
    });
  }

  handleMaxRosterSizeChange(e, maxRosterSize) {
    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        maxRosterSize: maxRosterSize
      }
    });
  }

  handleHometownChange(location) {
    this.setState({
      fantasyLeague: {
        ...this.state.fantasyLeague,
        hometown: location
      }
    });
  }

  handleCloseToast() {
    this.setState({
      toastOpen: false
    });
  }

  submitNewFantasyLeague() {
    let fantasyLeague = this.state.fantasyLeague;
    let adminEmail = {};
    adminEmail[fantasyLeague.adminEmail] = 'admin';

    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/fantasy_leagues/create',
      data: {
        fleague_name          : fantasyLeague.name,
        fleague_admins        : adminEmail,
        sport                 : fantasyLeague.sport,
        pro_leagues           : fantasyLeague.proLeagues,
        contest_type          : 'league',
        privacy_mode          : 'private',
        league_size_limit     : 100,
        league_start_dateTime : fantasyLeague.cutOffDate,
        status                : 'in progress',            // TODO: should probably be set on the server side
        settings              : { draft_mode : 'auto' }   // TODO: figure out what this is for
      }
    }).then((resp) => {
      if (resp.success) {
        // send invites
        this.sendInvites(resp.league.fleague_id);

        resp.league.invited_users = this.state.fantasyLeague.userEmails;
        this.props.dispatch(setActiveFantasyLeague(resp.league));
        this.props.dispatch(addToMyFantasyLeagues(resp.league));

        this.context.router.push('/fantasy-leagues/' + resp.league.fleague_id);
      }
      else {
        this.setState({
          errorMessage: 'Failed to create fantasy league',
          toastOpen: true
        });
        console.error('creation failed', resp);
      }
    }).catch((error) => {
      this.setState({
        errorMessage: 'Error creating fantasy league',
        toastOpen: true
      });
      console.error('creation errored', error);
    });
  }

  sendInvites(fantasyLeagueId) {
    if(this.state.fantasyLeague.userEmails.length === 0) {
      return;
    }

    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/fantasy_leagues/invite',
      data: {
        fleague_id  : fantasyLeagueId,
        emails      : this.state.fantasyLeague.userEmails
      }
    }).then((resp) => {
      if (resp.success) {
        // do nothing
      }
      else {
        alert('Failed to invite users');
        console.error('Failed to invite users', resp);
      }
    }).catch((error) => {
      alert('Error occurred inviting users');
      console.error('Error occurred inviting users', error);
    });
  }

  render() {
    return (
      <div className='rc-NewFantasyLeague'>
        <SmallBanner
          title='New Fantasy League'
          />

        <div className='content'>
          <Section>
            <Stepper
                currentStep={this.state.stepper.currentStep}
                getStepContent={this.getStepContent}
                handlePrev={this.handlePrev}
                handleNext={this.handleNext}
                stepNames={this.state.stepper.stepNames}
                />
          </Section>

        </div>

        <Toast
          open={this.state.toastOpen}
          type='ERROR'
          message={this.state.errorMessage}
          onClose={this.handleCloseToast}
          />
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(NewFantasyLeague)
