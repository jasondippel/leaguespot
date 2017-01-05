/**
 * @module components/inputs/text/TextField
 */

/* Style Dependencies */
import './TextField.less';

/* Script Dependencies */
import React from 'react';
import MuiTextField from 'material-ui/TextField';
import _ from 'underscore';

/* Material UI Theme */
import darkTheme from '../../../constants/CustomTheme';
import lightTheme from '../../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/* The following import and function call is needed to surpress a warning
 * from MaterialUI
 */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || ''
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.setState({
        value: newProps.value
      });
    }
  }

  render() {
    var textFieldProps = _.pick(this.props, 'defaultValue', 'disabled', 'errorText', 'floatingLabelFixed', 'floatingLabelText', 'fullWidth', 'hintText', 'multiLine', 'onChange', 'onKeyDown', 'type', 'underlineShow', 'value');
    
    let customTheme = this.props.lightTheme ? lightTheme : darkTheme;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className='rc-TextField'>
          <MuiTextField {...textFieldProps}
            floatingLabelStyle={{color: '#aaa'}}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

TextField.displayName = 'TextField';

const {any, bool, func, number, string} = React.PropTypes;

TextField.propTypes = {
  defaultValue: string,
  disabled: bool,
  errorText: string,
  floatingLabelFixed: bool,
  floatingLabelText: string,
  fullWidth: bool,
  hintText: string,
  lightTheme: bool,
  multiLine: bool,
  onChange: func,
  onKeyDown: func,
  type: string,                     // All input types; 'text', 'email', etc.
  underlineShow: bool,
  value: string
};

TextField.defaultProps = {
  disabled: false,
  errorText: null,
  floatingLabelFixed: false,
  fullWidth: false,
  lightTheme: false,
  multiLine: false,
  onChange: () => {},
  onKeyDown: () => {},
  underlineShow: true,
};
