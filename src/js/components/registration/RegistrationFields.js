import React from "react";

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
      province          : ""
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
         this.state.province    == ""
       ) {
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

    let isValid = this.verifyData();

    if (isValid) {
      console.log("good data", this.state);
      // make response promise
      // this.props.nextStep();
    } else {
      console.log("bad/missing data");
    }
  }

  render() {
    return (
      <div>
        <h1>Create Your Account</h1>

        <label>Name</label>
        <input type="text" ref="firstName" placeholder="First Name" onChange={this.handleFirstNameChange.bind(this)} />
        <input type="text" ref="lastName" placeholder="Last Name"  onChange={this.handleLastNameChange.bind(this)} />

        <label>Email</label>
        <input type="text" ref="email" placeholder="your@email.com"  onChange={this.handleEmailChange.bind(this)} />

        <label>Password</label>
        <input type="password" ref="password" placeholder="Password"  onChange={this.handlePasswordChange.bind(this)} />
        <input type="password" ref="confirmPassword" placeholder="Confirm Password"  onChange={this.handleConfirmPasswordChange.bind(this)}/>

        <label>Birthday</label>
        <input type="text" ref="birthday" placeholder="YYYY-MM-DD"  onChange={this.handleBirthdayChange.bind(this)} />

        <label>Residence</label>
        <input type="text" ref="countryCode" placeholder="Country"  onChange={this.handleCountryChange.bind(this)} />
        <input type="text" ref="state" placeholder="Province/State"  onChange={this.handleRegionChange.bind(this)} />
        <input type="text" ref="city" placeholder="City"  onChange={this.handleCityChange.bind(this)} />

        <button className="btn" onClick={this.register.bind(this)}>Register</button>
      </div>
    );
  }
}
