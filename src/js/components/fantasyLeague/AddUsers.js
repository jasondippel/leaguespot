import React from "react";

import * as view from "../../scripts/ActiveView";
import APIRequest from "../../scripts/APIRequest";

export default class AddUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      userEmails: []
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
    this.props.history.push("/fantasyLeague/dashboard");
  }

  render() {
    let that = this;

    return (
      <div className="form formDark">

        <div className="row">
          <label>Invite Users</label>
        </div>

        {this.props.state.inviteEmails.map(function(email, index) {
          return (
            <div className="row">
              <div className="column6">
                <input type="text" className="noPadding column12"
                  value={email}
                  placeholder="Enter Invite Email"
                  data-index={index}
                  onChange={that.props.handleInvitesChange} />
              </div>
              { that.props.state.inviteEmails.length > 1 ?
                  (<div className="column6 right">
                    <button className="btn small secondary column6" data-index={index} onClick={that.props.removeInvite}>Remove Invite</button>
                  </div>) :
                  ""
              }
            </div>
          );
        })}

        <div className="row">
          <button className="btn submit" onClick={this.props.addBlankInvite}>Add Invite</button>
        </div>

        <div className="row">
          <button className="btn submit" onClick={this.props.prevStep}>Previoius</button>
          <button className="btn submit" onClick={this.props.createLeague}>Finish</button>
        </div>
      </div>
    );
  }
}
