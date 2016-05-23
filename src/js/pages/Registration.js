import React from "react";
import RegistrationFields from "../components/registration/RegistrationFields";
import FormSuccess from "../components/form/FormSuccess";

export default class Registration extends React.Component {
  constructor() {
    super()
    this.state = {
      step: 1
    };
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  render() {
    return (
      <div className="popupLight">
        <h1>Create Your Account</h1>
        {(() => {
          switch (this.state.step) {
      			case 1: return <RegistrationFields nextStep={this.nextStep.bind(this)} />
      			case 2: return <FormSuccess type="Registration" />
      		}
        })()}
      </div>
    );
  }
}
