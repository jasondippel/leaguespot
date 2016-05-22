import React from "react";

export default class RegistrationFields extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName         : null,
      lastName          : null,
      email             : null,
      validEmail        : false,
      password          : null,
      validPassword     : false,
      dateOfBirth       : null,
      validDateOfBirth  : false,
      country           : null,
      state             : null,
      province          : null
    };
  }

  verifyData(data) {
    // make sure we have first/last name, email, (confirmed) password, country,
    // state, province, dob

    // make sure email is valid format

    // NOTE: country/state validation and conversion to code should be done
    //       on the backend to eliminate need for frontend to load that data
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
    let validEmail = validateEmail(e.target.value);

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
    if (confirmedPassword !== this.state.password) {
      console.log("passwords don't match");
    } else {
      console.log("passwords match!");
    }
  }

  handleBirthdayChange(e) {
    this.setState({
      dateOfBirth : e.target.value
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

    let isValidObj = verifyData(data);

    if (isValidObj.valid) {
      console.log("good data");
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
