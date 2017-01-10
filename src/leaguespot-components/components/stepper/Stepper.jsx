/**
 * @module components/stepper/Stepper
 */

/* Style Dependencies */
import './Stepper.less';
import Colours from '../../constants/colours';

/* Script Dependencies */
import React from 'react';
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper';
import RaisedButton from '../buttons/RaisedButton';
import FlatButton from '../buttons/FlatButton';

/* Material UI Theme */
import LightTheme from '../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class LsStepper extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  handleNext() {
    this.props.handleNext();
  }

  handlePrev() {
    this.props.handlePrev();
  }

  renderSteps() {
    let steps = this.props.stepNames.map(function(name, key) {
      return (
        <Step key={key}>
          <StepLabel style={{color: Colours.darkTextPrimary}}>{name}</StepLabel>
        </Step>
      );
    });

    return steps;
  }

  renderStepContent() {
    return this.props.getStepContent();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className='rc-Stepper'>
          <div className='steps'>
            <Stepper activeStep={this.props.currentStep}>
              {this.renderSteps()}
            </Stepper>
          </div>
          <div className='rc-Stepper-Content'>
            {this.renderStepContent()}
          </div>
          <div className='buttons'>
            <FlatButton
              label='Back'
              onClick={this.handlePrev}
              type={this.props.currentStep === 0 ? 'disabled' : 'default'}
              />
            <RaisedButton
              label={this.props.currentStep === this.props.stepNames.length - 1 ? 'Finish' : 'Next'}
              onClick={this.handleNext}
              type='primary'
              />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

LsStepper.displayName = 'Stepper';

const {any, array, bool, func, number, string} = React.PropTypes;

LsStepper.propTypes = {
  currentStep: number.isRequired,   // NOTE: steps should be 0 indexed
  getStepContent: func.isRequired,
  handleNext: func.isRequired,
  handlePrev: func.isRequired,
  stepNames: array.isRequired
};

LsStepper.defaultProps = {
};
