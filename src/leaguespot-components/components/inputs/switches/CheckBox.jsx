/**
 * @module components/inputs/switches/CheckBox
 */

/* Style Dependencies */
import './CheckBox.less';

/* Script Dependencies */
import React from 'react';
import MuiCheckBox from 'material-ui/Checkbox';
import _ from 'underscore';

/* Material UI Theme */
import customTheme from '../../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked || false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.checked !== this.props.checked) {
      this.setState({
        checked: newProps.checked
      });
    }
  }

  handleChange(event, checked) {
    this.setState({
      checked: checked
    });

    this.props.onChange(event, checked);
  }

  render() {
    const checkBoxProps = _.pick(this.props, 'checkedIcon', 'disabled', 'label', 'labelPosition');

    checkBoxProps.onCheck = this.handleChange;
    checkBoxProps.checked = this.state.checked;
    checkBoxProps.disableTouchRipple = true;    // removes ripple effect used by Material UI

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className='rc-CheckBox'>
          <MuiCheckBox {...checkBoxProps} />
        </div>
      </MuiThemeProvider>
    );
  }
}

CheckBox.displayName = 'CheckBox';

const {any, array, bool, func, number, string} = React.PropTypes;

CheckBox.propTypes = {
  checked: bool,
  checkedIcon: any,
  disabled: bool,
  label: string,
  labelPosition: React.PropTypes.oneOf([
    'left',
    'right',
  ]),
  onChange: func
};

CheckBox.defaultProps = {
  checked: false,
  labelPosition: 'right',
  onChange: () => {}
};
