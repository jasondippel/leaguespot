import React from "react";
import APIRequestClass from "../scripts/APIRequest";
import * as auth from "../scripts/PersistentUser";

const APIRequest = new APIRequestClass();

export default class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      email    : "",
      password : ""
    };
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
        auth.setLoggedInUser(resp.username);
      }
      else {
        alert("Email and/or password is incorrect.");
      }
    }).catch((error) => {
      console.log("Error making request: ", error);
      // TODO: need to remove this, purely for testing purposes
      // auth.setLoggedInUser("Jason");
      that.props.login("Jason");
    });
  }

  render() {
    return (
      <div className="popupLight">
        <h1>Sign In</h1>

          <div className="formLight">
            <div className="row">
              <input type="text" className="inputGroupTop" ref="email" placeholder="your@email.com"  onChange={this.handleEmailChange.bind(this)} />
              <input type="password" className="inputGroupBottom" ref="password" placeholder="Password"  onChange={this.handlePasswordChange.bind(this)} />
            </div>

            <div className="row">
              <button className="btn submit full" onClick={this.signIn.bind(this)}>Sign In</button>
            </div>
          </div>

      </div>
    );
  }
}
