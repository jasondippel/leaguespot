/**
 * Step 3: Invite existing and new users
 */

/* Style Dependencies */
import './NewFantasyLeagueSteps.less';

/* Script Dependencies */
import React from 'react';
import Section from '../../../leaguespot-components/components/containers/Section';
import TextField from '../../../leaguespot-components/components/inputs/text/TextField';
import Chip from '../../../leaguespot-components/components/chips/Chip';
import SmallBanner from '../../../components/banners/SmallBanner';
import RaisedButton from '../../../leaguespot-components/components/buttons/RaisedButton';
import { validateEmail } from '../../../utils/Validate';


export default class InviteUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      currentEmail: '',
      inputError: undefined
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.submitEmailAddress = this.submitEmailAddress.bind(this);
    this.removeEmailAddress = this.removeEmailAddress.bind(this);
    this.updateEnteredEmail = this.updateEnteredEmail.bind(this);
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

    this.props.addEmailAddress(this.state.currentEmail);
    this.setState({
      currentEmail: '',
      inputError: undefined
    });
  }

  removeEmailAddress(index) {
    this.props.removeEmailAddress(index);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.submitEmailAddress();
    }
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

  render() {
    let buttonStyle = {
      verticalAlign: 'bottom',
      paddingBottom: '0.5em'
    };

    if (this.state.inputError) {
      buttonStyle['paddingBottom'] = '2.5em';
    }

    return (
      <div className='stepContent'>
        <Section padContent={true} >
          <p>Enter the emails of users you would like to include in your league. If an email you entered does not currently have an account, we will send them an email.</p>
          <div className='existingEmails'>
            {this.props.userEmails.map(this.renderChip, this)}
          </div>

          <div className='column4'>
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
          <div className='column8' style={buttonStyle}>
            <RaisedButton
              label='Add'
              onClick={this.submitEmailAddress}
              />
          </div>

        </Section>
      </div>
    );
  }
}
