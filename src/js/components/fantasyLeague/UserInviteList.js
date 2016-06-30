/*
 * User email list
 *
 */

import React from "react";
import TextField from 'material-ui/TextField';

import APIRequest from "../../scripts/APIRequest";

export default class UserInviteList extends React.Component {
  constructor() {
    super()
    this.state = {
      userEmails: [ "" ]
    };
  }

  validateEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      return false;
    } else {
      return true;
    }
  }

  _handleUserEmailChange(event) {
    let emailList = this.state.userEmails;

    if(event.target.dataset.index) {
      emailList[event.target.dataset.index] = event.target.value;

      // let parent know of change
      this.props.handleUserEmailChange(emailList);

      this.setState({
        userEmails: emailList
      });
    }
  }

  _addUserEmailField(event) {
    let emailList = this.state.userEmails;
    emailList.push("");

    this.setState({
      userEmails: emailList
    });
  }

  _removeInvite(event) {
    let emailList = this.state.userEmails;

    if(event.target.dataset.index && this.state.userEmails.length > 1) {
      let index = event.target.dataset.index;
      emailList.splice(index, 1);

      this.setState({
        userEmails: emailList
      });
    }
  }

  render() {
    let that = this;

    return (
      <div className="column12">
        <span className="title">Invite Users</span>
        <p className="subtext">Enter the emails of users you would like to join your league! If they're not already members of LeagueSpot, we'll send them an email to invite them.</p>

        { this.state.userEmails.map(function(email, index) {
          return (
            <div className="row">
              <TextField
                data-index={index}
                onChange={that._handleUserEmailChange.bind(that)}
                floatingLabelText="User Email"
                value={ email !== "" ? email : null} />

              { that.state.userEmails.length > 1 ?
                <button
                  className="btn simpleGreyBtn"
                  data-index={index}
                  onClick={that._removeInvite.bind(that)} >
                  Remove Invite
                </button> :
                ""
              }

            </div>
          );
        })}

        <div className="column12 right">
          <button className="btn simpleGreenBtn" onClick={that._addUserEmailField.bind(that)}>Add Invite</button>
        </div>

      </div>
    );
  }
}
