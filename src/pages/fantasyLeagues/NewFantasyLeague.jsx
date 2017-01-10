/**
 * Form to create a new fantasy league
 */

/* Style Dependencies */
import './NewFantasyLeague.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import Stepper from '../../leaguespot-components/components/stepper/Stepper';
import Section from '../../leaguespot-components/components/containers/Section';
import Option from '../../leaguespot-components/components/inputs/selectors/Option';
import SmallBanner from '../../components/banners/SmallBanner';
import * as leagueInfo from '../../utils/ProLeagues';

/* Steps */
import SetupBasics from './NewFantasyLeagueSteps/SetupBasics';
import ModifySettings from './NewFantasyLeagueSteps/ModifySettings';
import InviteUsers from './NewFantasyLeagueSteps/InviteUsers';


export default class NewFantasyLeague extends React.Component {
  constructor() {
    super();

    this.state = {
      stepper: {
        currentStep: 0,
        stepNames: [
          'Setup league basics',
          'Modify league rules',
          'Invite users'
        ],
        fantasyLeague: {
          name: '',
          sport: '',
          proLeagues: []
        }
      }
    };

    this.getStepContent = this.getStepContent.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  getStepContent() {
    let stepContent;

    switch (this.state.stepper.currentStep) {
      case 0:
        let sportsOptions = this.renderSportOptions();
        stepContent = (
          <SetupBasics
            sportsOptions={sportsOptions}
            />
        );
        break;
      case 1:
        stepContent = ( <ModifySettings /> );
        break;
      case 2:
        stepContent = ( <InviteUsers /> );
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

  handleNext() {
    if (this.state.stepper.currentStep === this.state.stepper.stepNames.length) {
      alert('You\'re at the final step already!');
    } else {
      this.setState({
        stepper: {...this.state.stepper, currentStep: this.state.stepper.currentStep + 1}
      });
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

  renderSportOptions() {
    let sports = leagueInfo.getSports();
    let sportsItems = [];

    sportsItems = sports.map((sport, key) => {
      return (
        <Option key={key} value={sport} primaryText={sport} />
      );
    });

    return sportsItems;
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
      </div>
    );
  }
}
