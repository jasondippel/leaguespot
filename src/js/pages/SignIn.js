import React from "react";
import APIRequest from "../scripts/APIRequest";
import * as auth from "../scripts/PersistentUser";

export default class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      email    : "",
      password : "",
      failedAttempt: false,
      failureMessage: ""
    };
  }

  validEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      return false;
    } else {
      return true;
    }
  }

  handleEmailChange(e) {
    this.setState({
      email : e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password : e.target.value
    });
  }

  signIn() {
    // make sure email is valid
    if(!this.validEmail(this.state.email)) {
      this.setState({
        failedAttempt: true,
        failureMessage: "Please enter a valid email"
      });
      return;
    }

    // make sure they've entered a password
    if(this.state.password === "") {
      this.setState({
        failedAttempt: true,
        failureMessage: "Please enter a password"
      });
      return;
    }

    let that = this;
    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/login",
      data: {
        email     : this.state.email,
        password  : this.state.password
      }
    }).then((resp) => {
      if (resp.success) {
        that.props.login(resp.sessionID, resp.user);
      }
      else {
        that.setState({
          failedAttempt: true,
          failureMessage: "Invalid email or password"
        });
      }
    }).catch((error) => {
      console.log(error);
      
      that.setState({
        failedAttempt: true,
        failureMessage: "Unable to handle request, please try again later"
      });
    });
  }

  render() {
    let that = this;

    return (
      <div className="container padTop">
        <div className="popupLight">
          <h1>Sign In</h1>

            <div className="form formLight">
              <div className="row">
                { that.state.failedAttempt ?
                    (<span className="failureMessage">{that.state.failureMessage}</span>) : ""
                }
              </div>
              <div className="row">
                <input type="text" className="inputGroupTop" ref="email" placeholder="your@email.com"  onChange={this.handleEmailChange.bind(this)} />
                <input type="password" className="inputGroupBottom" ref="password" placeholder="Password"  onChange={this.handlePasswordChange.bind(this)} />
              </div>

              <div className="row">
                <button className="btn submit full" onClick={this.signIn.bind(this)}>Sign In</button>
              </div>
            </div>

        </div>
      </div>
    );
  }
}
