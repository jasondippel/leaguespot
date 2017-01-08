/**
 * Sign up page for new users
 */

 /* Style Dependencies */
 import './SignUp.less';

 /* Script Dependencies */
 import React from 'react';
 import TextField from '../../leaguespot-components/components/inputs/text/TextField';
 import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';

export default class SignUp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    // TODO: make call to backend

    this.context.router.push('/dashboard');
  }

  render() {
    return (
      <div className='rc-SignUp'>

        <div className='infoBanner'>
          <div className='title'>Sign Up</div>

          Create your account to begin playing. Accounts are free to create and give you access to multiple sports leagues to play with. Invite your friends and let the competition begin!
        </div>

        <div className='content'>
          <div className='column3' />

          <div className='signUpForm column6'>
            <div className='errorMessage'>
                <span class='text'>This is a sample error message</span>
            </div>

            <div className='column6'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='First Name'
                hintText='Your'
                lightTheme={true}
                fullWidth={true}
                />
            </div>
            <div className='column6'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='Last Name'
                hintText='Name'
                lightTheme={true}
                fullWidth={true}
                />
            </div>
            <div className='column12'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='Email'
                hintText='your@email.com'
                lightTheme={true}
                type='email'
                fullWidth={true}
                />
            </div>
            <div className='column6'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='Password'
                hintText='password'
                lightTheme={true}
                type='password'
                fullWidth={true}
                />
            </div>
            <div className='column6'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='Confirm Password'
                hintText='password'
                lightTheme={true}
                type='password'
                fullWidth={true}
                />
            </div>

            <div className='buttons'>
              <RaisedButton
                label='Continue'
                type='primary'
                onClick={this.handleSignUp}
                />
            </div>
          </div>

          <div className='column3' />
        </div>

      </div>
    );
  }
}
