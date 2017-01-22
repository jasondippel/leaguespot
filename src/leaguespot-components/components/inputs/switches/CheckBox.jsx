/**
 * @module components/inputs/switches/CheckBox
 */

/* Style Dependencies */
import './CheckBox.less';

/* Script Dependencies */
import React from 'react';
import MuiCheckBox from 'material-ui/Checkbox';
import _ from 'underscore';
import colours from '../../../constants/colours';

/* Material UI Theme */
import LightTheme from '../../../constants/LightTheme';
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
    const checkBoxProps = _.pick(this.props, 'checkedIcon', 'disabled', 'label', 'labelPosition', 'value');

    checkBoxProps.onCheck = this.handleChange;
    checkBoxProps.checked = this.state.checked;
    checkBoxProps.disableTouchRipple = true;    // removes ripple effect used by Material UI
    checkBoxProps.iconStyle = {
      color: colours.darkTextSecondary,
      borderColor: colours.darkTextSecondary
    }

    let styles = {};
    if (this.props.marginRight) {
      styles['marginRight'] = this.props.marginRight;
    }
    if (this.props.marginLeft) {
      styles['marginLeft'] = this.props.marginLeft;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className='rc-CheckBox' style={styles}>
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
  onChange: func,
  marginRight: string,
  marginLeft: string,
  value: any
};

CheckBox.defaultProps = {
  checked: false,
  labelPosition: 'right',
  marginRight: '1.25em',
  onChange: () => {}
};
