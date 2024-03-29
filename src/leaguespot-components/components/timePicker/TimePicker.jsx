/**
 * @module components/stepper/Stepper
 */

/* Style Dependencies */
import './TimePicker.less';
import Colours from '../../constants/colours';

/* Script Dependencies */
import React from 'react';
import MuiTimePicker from 'material-ui/TimePicker';
import moment from 'moment';

/* Material UI Theme */
import LightTheme from '../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, date) {
    this.props.onChange(date);
  }

  render() {
    // TODO: figure out a way to use our own button in the modal

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className='rc-TimePicker'>
          <MuiTimePicker
            disabled={this.props.disabled}
            format='ampm'
            hintText={this.props.hintText}
            onChange={this.handleChange}
            floatingLabelFixed={this.props.floatingLabelFixed}
            floatingLabelText={this.props.floatingLabelText}
            value={this.props.value}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

TimePicker.displayName = 'TimePicker';

const {any, array, bool, func, number, object, string} = React.PropTypes;

TimePicker.propTypes = {
  disabled: bool,
  hintText: string,
  onChange: func,
  value: any
};

TimePicker.defaultProps = {
  disabled: false,
  hintText: 'Choose a time...',
  onChange: () => {},
  value: undefined
};
