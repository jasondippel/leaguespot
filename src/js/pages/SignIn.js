import React from "react";

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
    console.log("signIn not hooked up");
  }

  render() {
    console.log("sign in");
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
