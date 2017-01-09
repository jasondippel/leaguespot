/**
 * Sign up page for new users
 */

/* Style Dependencies */
import './SignUp.less';

/* Script Dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../actions/UserActions';
import { validateEmail } from '../../utils/Validate';
import TextField from '../../leaguespot-components/components/inputs/text/TextField';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import APIRequest from '../../utils/APIRequest';


class SignUp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.state = {
      firstName         : '',
      lastName          : '',
      email             : '',
      password          : '',
      confirmPassword   : '',
      errorMessage    : ''
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
  }

  verifyData() {
    // make sure we have first/last name, email, password
    if ( this.state.firstName   == '' ||
         this.state.lastName    == '' ||
         this.state.email       == '' ||
         this.state.password    == '' ||
         this.state.confirmPassword == ''
       ) {
      this.setState({
        errorMessage: 'Please enter all fields'
      });
      return false;
    }

    // make sure email is valid format and passwords match
    if ( !validateEmail(this.state.email) ) {
      this.setState({
        errorMessage: 'Please enter a valid email'
      });
      return false;
    }

    if ( !(this.state.password === this.state.confirmPassword) ) {
      this.setState({
        errorMessage: 'The passwords you entered do not match'
      });
      return false;
    }

    return true;
  }

  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  handleLastNameChange(e) {
    this.setState({
      lastName: e.target.value
    });
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

  handleConfirmPasswordChange(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleSignUp() {
    // verify information
    if (!this.verifyData()) {
      return;
    }

    let that = this;
    // make call to backend
    APIRequest.post({
        api: 'LeagueSpot',
        apiExt: '/register',
        data: {
          first_name   : this.state.firstName,
          last_name    : this.state.lastName,
          email        : this.state.email,
          password     : this.state.password
        }
      }).then((resp) => {
        if(resp.success) {
          // update store and set sessionId in local storage
          this.props.dispatch(setUser(resp.token, resp.user));
          this.context.router.push('/dashboard');
        } else {
          that.setState({
            errorMessage: resp.message
          });
        }
      }).catch((error) => {
        console.error(error);
        that.setState({
          errorMessage: 'Oops, something went wrong. Please try again later'
        });
      });
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
            { this.state.errorMessage ? (
                <div className='errorMessage'>
                    <span class='text'>{this.state.errorMessage}</span>
                </div>
              ) : ''
            }

            <div className='column6'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='First Name'
                hintText='Your'
                lightTheme={true}
                fullWidth={true}
                onChange={this.handleFirstNameChange}
                />
            </div>
            <div className='column6'>
              <TextField
                floatingLabelFixed={true}
                floatingLabelText='Last Name'
                hintText='Name'
                lightTheme={true}
                fullWidth={true}
                onChange={this.handleLastNameChange}
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
                onChange={this.handleEmailChange}
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
                onChange={this.handlePasswordChange}
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
                onChange={this.handleConfirmPasswordChange}
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

export default connect(
  (state) => ({})
)(SignUp)
