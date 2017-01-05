/**
 * @module components/icons/Icon
 */

/* Style Dependencies */
import './Icon.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Add from 'material-ui/svg-icons/content/add';
import ErrorCircle from 'material-ui/svg-icons/alert/error';
import Announcement from 'material-ui/svg-icons/action/announcement';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

/* Material UI Theme */
import LightTheme from '../../constants/LightTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  renderIcon() {
    let icon;

    switch (this.props.type) {
      case 'account-circle':
        icon = (
          <span>
            <AccountCircle color={this.props.color} hoverColor={this.props.hoverColor} />
          </span>
        );
        break;
      case 'add':
        icon = (
          <span>
            <Add color={this.props.color} hoverColor={this.props.hoverColor} />
          </span>
        );
        break;
      case 'announcement':
        icon = (
          <span>
            <Announcement color={this.props.color} hoverColor={this.props.hoverColor} />
          </span>
        );
        break;
      case 'check-circle':
        icon = (
          <span>
            <CheckCircle color={this.props.color} hoverColor={this.props.hoverColor} />
          </span>
        );
        break;
      case 'error-circle':
        icon = (
          <span>
            <ErrorCircle color={this.props.color} hoverColor={this.props.hoverColor} />
          </span>
        );
        break;
    }

    return icon;
  }

  render() {
    let icon = this.renderIcon();
    let classes = this.props.className ? this.props.className : '';
    let style = {
      color: this.props.color + ' !important',
      paddingRight: this.props.paddingRight || '0px',
      paddingLeft: this.props.paddingLeft || '0px'
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(LightTheme)}>
        <div className={'rc-Icon ' + classes} style={style}>
          {icon}
        </div>
      </MuiThemeProvider>
    );
  }
}

Icon.displayName = 'Icon';

const {any, bool, func, number, string} = React.PropTypes;

Icon.propTypes = {
  type: string,
  className: string,
  color: string,
  hoverColor: string,
  paddingLeft: string,
  paddingRight: string
};

Icon.defaultProps = {
  paddingRight: '0.5em'
};
