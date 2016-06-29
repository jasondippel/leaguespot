import React from "react";
import TextField from 'material-ui/TextField';

import * as view from "../../scripts/ActiveView";
import APIRequest from "../../scripts/APIRequest";

export default class AddUsers extends React.Component {
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

  inviteUsers() {
    if(this.props.inviteUsersFunction) {
      this.props.inviteUsersFunction(this.state.userEmails);
    }
    else {
      console.log("missing function for inviting users");
    }
  }

  _handleUserEmailChange(event) {
    let emailList = this.state.userEmails;

    if(event.target.dataset.index) {
      emailList[event.target.dataset.index] = event.target.value;

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
      emailList.splice(event.target.dataset.index, 1);

      this.setState({
        userEmails: emailList
      });
    }
  }

  render() {
    let that = this;

    return (
      <div className="column12">

        { this.state.userEmails.map(function(email, index) {
          return (
            <div className="row">

              { email !== "" ?
                <TextField
                  hintText="user@email.com"
                  data-index={index}
                  onChange={that._handleUserEmailChange.bind(that)}
                  defaultValue={email} /> :
                <TextField
                  hintText="user@email.com"
                  data-index={index}
                  onChange={that._handleUserEmailChange.bind(that)} />
              }

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
