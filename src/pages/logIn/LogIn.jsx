/**
 * Sign up page for new users
 */

/* Style Dependencies */
import './LogIn.less';

/* Script Dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../actions/UserActions';
import { Link } from 'react-router';
import TextField from '../../leaguespot-components/components/inputs/text/TextField';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import APIRequest from '../../utils/APIRequest';

class LogIn extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.state = {
      email    : '',
      password : '',
      errorMessage: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleLogIn();
    }
  }

  handleLogIn() {
    let that = this;
    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/login',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    }).then((resp) => {
      if (resp.success) {
        // update store
        this.props.dispatch(setUser(resp.token, resp.user));
        this.context.router.push('/dashboard');
      }
      else {
        that.setState({
          errorMessage: 'Invalid email or password'
        });
      }
    }).catch((error) => {
      console.error(error);

      // TODO: Fix this once backend is fixed. Error message should be "Oops,
      //       something went wrong. Please try again later"
      that.setState({
        errorMessage: 'Invalid email or password'
      });
    });
  }

  render() {
    return (
      <div className='rc-LogIn'>

        <div className='infoBanner'>
          <div className='title'>Login</div>

          If you've already got an account, continue to login below. If you don't have an existing account, continue <Link to='/sign-up' className='link'>here</Link> to sign up.
        </div>

        <div className='content'>
          <div className='column3' />

          <div className='signUpForm column6'>
            { this.state.errorMessage ? (
                <div className='errorMessage'>
                    <span class='text'>{this.state.errorMessage}</span>
                </div>
              ) : ''
            }

            <div className='column12'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='Email'
                hintText='your@email.com'
                lightTheme={true}
                type='email'
                fullWidth={true}
                onChange={this.handleEmailChange}
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
                onChange={this.handlePasswordChange}
                onKeyDown={this.handleKeyDown}
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

export default connect(
  (state) => ({})
)(LogIn)
