/**
 * User account management page
 */

/* Style Dependencies */
import './MyAccount.less';
import colours from '../../leaguespot-components/constants/colours';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import Section from '../../leaguespot-components/components/containers/Section';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import TextField from '../../leaguespot-components/components/inputs/text/TextField';
import Icon from '../../leaguespot-components/components/icons/Icon';
import Popup from '../../leaguespot-components/components/popup/Popup';
import Toast from '../../leaguespot-components/components/toast/Toast';
import SmallBanner from '../../components/banners/SmallBanner';
import { connect } from 'react-redux';
import store from '../store';
import { setUser } from '../../actions/UserActions';
import { Sanitize } from '../../utils/Sanitize';
import { validateEmail } from '../../utils/Validate';
import APIRequest from '../../utils/APIRequest';
import * as User from '../../utils/PersistentUser';


class MyAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      modifiedUser: {},
      editPopupOpen: false,
      passwordPopupOpen: false,
      toastOpen: false,
      toastMessage: '',
      toastType: 'DEFAULT',
      toastOnClose: () => {},
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
      errorMessage: ''
    };

    store.subscribe(() => {
      this.setState({
        user: store.getState().user.user
      });
    });

    this.handleCloseEditPopup = this.handleCloseEditPopup.bind(this);
    this.handleClosePasswordPopup = this.handleClosePasswordPopup.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
    this.handleOpenEditPopup = this.handleOpenEditPopup.bind(this);
    this.handleOpenPasswordPopup = this.handleOpenPasswordPopup.bind(this);
    this.handleOpenToast = this.handleOpenToast.bind(this);
    this.handleSaveEditPopup = this.handleSaveEditPopup.bind(this);
    this.handleUpdatePasswordPopup = this.handleUpdatePasswordPopup.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
  }

  componentWillMount() {
    this.setState({
      user: store.getState().user.user
    });
  }

  handleCloseEditPopup() {
    this.setState({
      editPopupOpen: false
    });
  }

  handleClosePasswordPopup() {
    this.setState({
      passwordPopupOpen: false
    });
  }

  handleCloseToast() {
    this.setState({
      toastOpen: false
    });
  }

  handleOpenEditPopup() {
    this.setState({
      editPopupOpen: true,
      modifiedUser: this.state.user,
      errorMessage: ''
    });
  }

  handleOpenPasswordPopup() {
    this.setState({
      passwordPopupOpen: true,
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
      errorMessage: ''
    });
  }

  handleOpenToast(type, message) {
    this.setState({
      toastOpen: true,
      toastType: type,
      toastMessage: message,
      toastOnClose: this.handleCloseToast
    });
  }

  handleFirstNameChange(e) {
    this.setState({
      modifiedUser: {...this.state.modifiedUser, first_name: e.target.value}
    });
  }

  handleLastNameChange(e) {
    this.setState({
      modifiedUser: {...this.state.modifiedUser, last_name: e.target.value}
    });
  }

  handleEmailChange(e) {
    this.setState({
      modifiedUser: {...this.state.modifiedUser, email: e.target.value}
    });
  }

  handleOldPasswordChange(e) {
    this.setState({
      oldPassword: e.target.value
    });
  }

  handleNewPasswordChange(e) {
    this.setState({
      newPassword: e.target.value
    });
  }

  handleConfirmPasswordChange(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleSaveEditPopup() {
    if (this.state.modifiedUser.first_name === '') {
      this.setState({
        errorMessage: 'You must have a first name'
      });
      return;
    }

    if (!validateEmail(this.state.modifiedUser.email)) {
      this.setState({
        errorMessage: 'You must have a valid email'
      });
      return;
    }

    // make call to backend
    let that = this;
    APIRequest.post({
        api: 'LeagueSpot',
        apiExt: '/users/update/'+this.state.user.id,
        data: {
          first_name  : this.state.modifiedUser.first_name,
          last_name   : this.state.modifiedUser.last_name,
          email       : this.state.modifiedUser.email
        }
      })
      .then((resp) => {
        if (resp.success) {
          let sessionId = User.getSessionId();
          that.props.dispatch(setUser(sessionId, that.state.modifiedUser));

          that.setState({
            user: {...that.state.modifiedUser}
          });
          that.handleOpenToast('success', 'User information updated');
          that.handleCloseEditPopup();
        } else {
          that.handleOpenToast('error', 'Failed to updated user information');
          console.error('Failed to update user information', resp.message);
        }
      })
      .catch((error) => {
        that.handleOpenToast('error', 'Error updating user information');
        console.error('Error updating user information', error);;
      });
  }

  handleUpdatePasswordPopup() {
    if (this.state.newPassword === '' ||
        this.state.oldPassword === '' ||
        this.state.confirmPassword === '' ) {
      this.setState({
        errorMessage: 'Blank passwords are not allowed'
      });
      return;
    }

    if(this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        errorMessage: 'New password does not match confirmed password'
      });
      return;
    }

    // make call to backend
    // update store on success

    this.handleOpenToast('error', 'Backend not hooked up yet');
    this.handleClosePasswordPopup();
  }

  renderEditPopupContents() {
    return (
      <div className='editPopupContent'>
        <div className='errorMessage'>
          {this.state.errorMessage}
        </div>

        <div className='column6'>
          <TextField
            floatingLabelFixed={true}
            floatingLabelText='First Name'
            hintText='Your'
            fullWidth={true}
            onChange={this.handleFirstNameChange}
            value={this.state.modifiedUser.first_name}
            />
        </div>
        <div className='column6'>
          <TextField
            floatingLabelFixed={true}
            floatingLabelText='Last Name'
            hintText='Name'
            fullWidth={true}
            onChange={this.handleLastNameChange}
            value={this.state.modifiedUser.last_name}
            />
        </div>
        <div className='column12'>
          <TextField
            floatingLabelFixed={true}
            floatingLabelText='Email'
            hintText='your@email.com'
            type='email'
            fullWidth={true}
            onChange={this.handleEmailChange}
            value={this.state.modifiedUser.email}
            />
        </div>
      </div>
    );
  }

  renderPasswordPopupContents() {
    return (
      <div className='passwordPopupContent'>
        <div className='errorMessage'>
          {this.state.errorMessage}
        </div>

        <div className='column12'>
          <TextField
            floatingLabelFixed={true}
            floatingLabelText='Old Password'
            hintText='old password'
            type='password'
            fullWidth={true}
            onChange={this.handleOldPasswordChange}
            value={this.state.oldPassword}
            />
        </div>
        <div className='column6'>
          <TextField
            floatingLabelFixed={true}
            floatingLabelText='New Password'
            hintText='new password'
            type='password'
            fullWidth={true}
            onChange={this.handleNewPasswordChange}
            value={this.state.newPassword}
            />
        </div>
        <div className='column6'>
          <TextField
            floatingLabelFixed={true}
            floatingLabelText='Confirm Password'
            hintText='confirm password'
            type='password'
            fullWidth={true}
            onChange={this.handleConfirmPasswordChange}
            value={this.state.confirmPassword}
            />
        </div>
      </div>
    );
  }

  renderEditPopupButtons() {
    let editPopupButtons = [
      (
        <FlatButton
          label='Cancel'
          onClick={this.handleCloseEditPopup}
          />
      ),
      (
        <RaisedButton
          label='Save'
          type='primary'
          onClick={this.handleSaveEditPopup}
          />
      )
    ];

    return editPopupButtons;
  }

  renderPasswordPopupButtons() {
    let editPopupButtons = [
      (
        <FlatButton
          label='Cancel'
          onClick={this.handleClosePasswordPopup}
          />
      ),
      (
        <RaisedButton
          label='Update'
          type='primary'
          onClick={this.handleUpdatePasswordPopup}
          />
      )
    ];

    return editPopupButtons;
  }

  render() {
    let passwordPopupButtons = this.renderPasswordPopupButtons(),
        passwordPopupContents = this.renderPasswordPopupContents(),
        editPopupButtons = this.renderEditPopupButtons(),
        editPopupContents = this.renderEditPopupContents();

    return (
      <div className='rc-MyAccount'>
        <SmallBanner
          title='My Account'
          />

        <div className='content'>
          <Popup
            open={this.state.editPopupOpen}
            title={'Edit'}
            message={editPopupContents}
            onClose={this.handleCloseEditPopup}
            buttons={editPopupButtons}
            />
          <Popup
            open={this.state.passwordPopupOpen}
            title={'Update password'}
            message={passwordPopupContents}
            onClose={this.handleClosePasswordPopup}
            buttons={passwordPopupButtons}
            />
          <Toast
            open={this.state.toastOpen}
            type={this.state.toastType}
            message={this.state.toastMessage}
            onClose={this.handleCloseToast}
            />

          <Section>
            <div className='accountCircle column3'>
              <Icon type='account-box' color={colours.darkTextSecondary} paddingLeft='0.5em' paddingRight='0.5em' height={150} width={150} />
            </div>

            <div className='column9'>
              <div className='generalInfo'>
                <div className='userName'>{Sanitize(this.state.user.first_name + ' ' + this.state.user.last_name)}</div>
                <div className='email'>{Sanitize(this.state.user.email)}</div>
              </div>
              <div className='editButton'>
                <FlatButton
                  label='Edit'
                  type='primary'
                  onClick={this.handleOpenEditPopup}
                  />
                  <FlatButton
                    label='Change password'
                    type='primary'
                    onClick={this.handleOpenPasswordPopup}
                    />
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(MyAccount)
