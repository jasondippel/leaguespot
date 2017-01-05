/**
 * Sign up page for new users
 */

 /* Style Dependencies */
 import './LogIn.less';

 /* Script Dependencies */
 import React from 'react';
 import { Link } from 'react-router';
 import TextField from '../../leaguespot-components/components/inputs/text/TextField';
 import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';

export default class LogIn extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn() {
    // TODO: make call to backend

    console.log('login this', this);
    this.context.router.push('/dashboard');
  }

  render() {
    return (
      <div className="rc-LogIn">

        <div className='infoBanner'>
          <div className='title'>Login</div>

          If you've already got an account, continue to login below. If you don't have an existing account, continue <Link to='/sign-up' className='link'>here</Link> to sign up.
        </div>

        <div className='content'>
          <div className='column3' />

          <div className='signUpForm column6'>
            <div className='errorMessage'>
                <span class='text'>This is a sample error message</span>
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
            <div className='column12'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='Password'
                hintText='password'
                lightTheme={true}
                type='password'
                fullWidth={true}
                />
            </div>

            <div className='buttons'>
              <RaisedButton
                label='Login'
                type='primary'
                onClick={this.handleLogIn}
                />
            </div>
          </div>

          <div className='column3' />
        </div>

      </div>
    );
  }
}
