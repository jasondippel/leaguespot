/**
 * @module components/buttons/RaisedButton
 */

/* Style Dependencies */
import './IconButton.less';

/* Script Dependencies */
import React from 'react';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ReactTooltip from 'react-tooltip'

/* Material UI Theme */
import customTheme from '../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class IconButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick();
  }

  renderIcon() {
    let icon;

    switch (this.props.type) {
      case 'addCircle':
        icon = (
          <AddCircle data-tip='Add' />
        );
        break;
      case 'removeCircle':
        icon = (
          <RemoveCircle data-tip='Remove' />
        );
        break;
      default:
        console.error('Invalid type supplied to IconButton', this.props.type);
    }

    return icon;
  }

  render() {
    let icon = this.renderIcon();
    let classes = 'rc-IconButton';
    if (this.props.disabled) {
      classes = classes + ' disabled'
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className={classes}>
          <button
            className={this.props.disabled ? 'disabled' : this.props.type}
            onClick={this.handleOnClick}
            disabled={this.props.disabled ? true : false}
            >
            {icon}
          </button>
          <ReactTooltip
            place='top'
            type='dark'
            effect='solid'
            delayShow={1000}
            disable={this.props.disabled ? true : false}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

IconButton.displayName = 'IconButton';

const {any, bool, func, number, string} = React.PropTypes;

IconButton.propTypes = {
  disabled: bool,
  hoverText: string,
  onClick: func,
  type: React.PropTypes.oneOf([
    'addCircle',
    'removeCircle'
  ]).isRequired
};

IconButton.defaultProps = {
  onClick: () => {}
};
