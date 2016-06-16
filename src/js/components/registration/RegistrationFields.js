import React from "react";
import APIRequest from "../../scripts/APIRequest";

export default class RegistrationFields extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName         : "",
      lastName          : "",
      email             : "",
      validEmail        : false,
      password          : "",
      validPassword     : false,
      country           : "",
      state             : "",
      city              : "",
      failedAttempt     : false,
      failureMessage    : ""
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

  verifyData() {
    // make sure we have first/last name, email, password, country,
    // state, province
    if ( this.state.firstName   == "" ||
         this.state.lastName    == "" ||
         this.state.email       == "" ||
         this.state.password    == "" ||
         this.state.country     == "" ||
         this.state.state       == "" ||
         this.state.city    == ""
       ) {
      return false;
    }

    // make sure email is valid format
    if ( this.state.validEmail       === false ||
         this.state.validPassword    === false
    ) {
      return false;
    }

    // NOTE: country/state validation and conversion to code should be done
    //       on the backend to eliminate need for frontend to load that data

    return true;
  }

  handleFirstNameChange(e) {
    this.setState({
      firstName : e.target.value
    });
  }

  handleLastNameChange(e) {
    this.setState({
      lastName : e.target.value
    });
  }

  handleEmailChange(e) {
    let validEmail = this.validateEmail(e.target.value);

    this.setState({
      email : e.target.value,
      validEmail : validEmail
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password : e.target.value
    });
  }

  handleConfirmPasswordChange(e) {
    let confirmedPassword = e.target.value;
    let matching = (confirmedPassword === this.state.password);

    this.setState({
      validPassword : matching
    });
  }

  handleCountryChange(e) {
    this.setState({
      country : e.target.value
    });
  }

  handleRegionChange(e) {
    this.setState({
      state : e.target.value
    });
  }

  handleCityChange(e) {
    this.setState({
      city : e.target.value
    });
  }

  register(e) {
    e.preventDefault();
    let that = this;
    let isValid = this.verifyData();

    if (isValid) {
      // make response promise
      APIRequest.post({
        api: "LeagueSpot",
        apiExt: "/register",
        data: {
          first_name   : this.state.firstName,
          last_name    : this.state.lastName,
          email        : this.state.email,
          password     : this.state.password,
          country      : this.state.country,
          state        : this.state.state,
          city         : this.state.city,
          dob          : "1994-03-22"
        }
      }).then((resp) => {
        if(resp.success) {
          that.props.nextStep();
        } else {
          that.setState({
            failedAttempt: true,
            failureMessage: resp.message
          });
        }
      }).catch((error) => {
        that.setState({
          failedAttempt: true,
          failureMessage: "Unable to handle request, please try again later"
        });
      });
    } else {
      this.setState({
        failedAttempt: true,
        failureMessage: "Please fill in all fields correctly"
      });
    }
  }

  render() {
    let that = this;

    return (
      <div className="form formLight">

        <div className="row">
          { that.state.failedAttempt ?
              (<span className="failureMessage">{that.state.failureMessage}</span>) : ""
          }
        </div>

        <div className="row">
          <label>Name</label>
          <input type="text" className="inputPair first" ref="firstName" placeholder="First Name" onChange={this.handleFirstNameChange.bind(this)} />
          <input type="text" className="inputPair last" ref="lastName" placeholder="Last Name"  onChange={this.handleLastNameChange.bind(this)} />
        </div>

        <div className="row">
          <label>Email</label>
          <input type="text" ref="email" placeholder="your@email.com"  onChange={this.handleEmailChange.bind(this)} />
        </div>

        <div className="row">
          <label>Password</label>
          <input type="password" className="inputGroupTop" ref="password" placeholder="Password"  onChange={this.handlePasswordChange.bind(this)} />
          <input type="password" className="inputGroupBottom" ref="confirmPassword" placeholder="Confirm Password"  onChange={this.handleConfirmPasswordChange.bind(this)}/>
        </div>

        <div className="row">
          <label>Hometown</label>
          <input type="text" className="inputGroupTop" ref="city" placeholder="City"  onChange={this.handleCityChange.bind(this)} />
          <input type="text" className="inputGroupBottom inputPair first" ref="state" placeholder="Province/State"  onChange={this.handleRegionChange.bind(this)} />
          <input type="text" className="inputGroupBottom inputPair last" ref="countryCode" placeholder="Country"  onChange={this.handleCountryChange.bind(this)} />
        </div>

        <div className="row">
          <button className="btn submit full" onClick={this.register.bind(this)}>Register</button>
          <p className="subtext">Clicking "Register" confirms you are 18+ years of age.</p>
        </div>
      </div>
    );
  }
}
