import React from "react";
import APIRequestClass from "../../scripts/APIRequest";
const APIRequest = new APIRequestClass();

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
      dateOfBirth       : "",
      validDateOfBirth  : false,
      country           : "",
      state             : "",
      city              : ""
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
    // state, province, dob
    if ( this.state.firstName   == "" ||
         this.state.lastName    == "" ||
         this.state.email       == "" ||
         this.state.password    == "" ||
         this.state.dateOfBirth == "" ||
         this.state.country     == "" ||
         this.state.state       == "" ||
         this.state.city    == ""
       ) {
      console.log("missing a value");
      return false;
    }

    // make sure email is valid format
    if ( this.state.validEmail       === false ||
         this.state.validPassword    === false ||
         this.state.validDateOfBirth === false
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
    console.log("valid email: " + validEmail);

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

  handleBirthdayChange(e) {
    let dateOfBirth = e.target.value;
    let validDateOfBirth = /^\d\d\d\d-\d\d-\d\d$/.test(dateOfBirth);
    console.log("validDOB: " + validDateOfBirth);

    this.setState({
      dateOfBirth : dateOfBirth,
      validDateOfBirth : validDateOfBirth
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
      console.log("good data", this.state);
      // make response promise
      APIRequest.post({
        api: "LeagueSpot",
        apiExt: "/register",
        data: {
          first_name   : this.state.firstName,
          last_name    : this.state.lastName,
          email        : this.state.email,
          password     : this.state.password,
          dob          : this.state.dateOfBirth,
          country      : this.state.country,
          state        : this.state.state,
          city         : this.state.city
        }
      }).then((resp) => {
        that.props.nextStep();
      }).catch((error) => {
        console.log("Error making request: ", error);
        alert("Please make sure all fields have valid information and the correct formatting.");
      });
    } else {
      console.log("bad/missing data");
      alert("Please fill in all fields.");
    }
  }

  render() {
    return (
      <div className="formLight">

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
          <input type="password" className="inputPair first" ref="password" placeholder="Password"  onChange={this.handlePasswordChange.bind(this)} />
          <input type="password" className="inputPair last" ref="confirmPassword" placeholder="Confirm Password"  onChange={this.handleConfirmPasswordChange.bind(this)}/>
        </div>

        <div className="row">
          <label>Birthday</label>
          <input type="text" ref="birthday" placeholder="YYYY-MM-DD"  onChange={this.handleBirthdayChange.bind(this)} />
        </div>

        <div className="row">
          <label>Hometown</label>
          <input type="text" className="inputGroupTop" ref="city" placeholder="City"  onChange={this.handleCityChange.bind(this)} />
          <input type="text" className="inputGroupBottom inputPair first" ref="state" placeholder="Province/State"  onChange={this.handleRegionChange.bind(this)} />
          <input type="text" className="inputGroupBottom inputPair last" ref="countryCode" placeholder="Country"  onChange={this.handleCountryChange.bind(this)} />
        </div>

        <div className="row">
          <button className="btn submit" onClick={this.register.bind(this)}>Register</button>
          <p className="subtext">Clicking "Register" confirms you are 18+ years of age.</p>
        </div>
      </div>
    );
  }
}
