/**
 * @module components/stepper/Stepper
 */

/* Style Dependencies */
import './DatePicker.less';
import Colours from '../../constants/colours';

/* Script Dependencies */
import React from 'react';
import MuiDatePicker from 'material-ui/DatePicker';
import moment from 'moment';

/* Material UI Theme */
import LightTheme from '../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, date) {
    this.props.onChange();
  }

  render() {
    // TODO: figure out a way to use our own button in the modal

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className='rc-DatePicker'>
          <MuiDatePicker
            disabled={this.props.disabled}
            firstDayOfWeek={0}
            hintText={this.props.hintText}
            locale='en-US'
            minDate={this.props.minDate}
            mode='landscape'
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

DatePicker.displayName = 'DatePicker';

const {any, array, bool, func, number, object, string} = React.PropTypes;

DatePicker.propTypes = {
  disabled: bool,
  hintText: string,
  minDate: object,
  onChange: func
};

DatePicker.defaultProps = {
  disabled: false,
  hintText: 'Choose a date...',
  minDate: new Date(),
  onChange: () => {}
};
