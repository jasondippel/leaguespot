/**
 * @module components/inputs/text/TextField
 */

/* Style Dependencies */
import './SelectField.less';

/* Script Dependencies */
import React from 'react';
import MuiSelectField from 'material-ui/SelectField';
import _ from 'underscore';

/* Material UI Theme */
import customTheme from '../../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class SelectField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.setState({
        value: newProps.value
      });
    }
  }

  handleChange(event, index, value) {
    this.setState({
      value: value
    });

    this.props.onChange();
  }

  render() {
    const selectFieldProps = _.pick(this.props, 'disabled', 'errorText', 'floatingLabelFixed', 'floatingLabelText',' fullWidth', 'hintText', 'id', 'onChange');

    selectFieldProps.onChange = this.handleChange;
    selectFieldProps.value = this.state.value;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className='rc-SelectField'>
          <MuiSelectField {...selectFieldProps}
            floatingLabelStyle={{color: '#aaa'}}
            >
            {this.props.items}
          </MuiSelectField>
        </div>
      </MuiThemeProvider>
    );
  }
}

SelectField.displayName = 'SelectField';

const {any, array, bool, func, number, string} = React.PropTypes;

SelectField.propTypes = {
  disabled: bool,
  errorText: string,
  floatingLabelFixed: bool,
  floatingLabelText: string,
  fullWidth: bool,
  hintText: string,
  id: string,
  items: array.isRequired,
  onChange: func,
  value: string
};

SelectField.defaultProps = {
  disabled: false,
  errorText: null,
  floatingLabelFixed: false,
  floatingLabelText: null,
  fullWidth: false,
  hintText: null,
  id: null,
  onChange: () => {},
  value: null
};
