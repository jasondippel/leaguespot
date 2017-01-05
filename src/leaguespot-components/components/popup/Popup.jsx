/**
 * @module components/popup/Popup
 */

/* Style Dependencies */
import './Popup.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import colours from '../../constants/colours';
import Dialog from 'material-ui/Dialog';
import ErrorCircle from 'material-ui/svg-icons/alert/error';
import Announcement from 'material-ui/svg-icons/action/announcement';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

/* Material UI Theme */
import customTheme from '../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose()  {
    if (this.props.onClose) {
        this.props.onClose();
    }
  }

  getTypeColour() {
    let colour = colours.lightTextPrimary;

    switch (this.props.type.toUpperCase()) {
      case 'SUCCESS':
        colour = colours.leaguespotGreenPrimary;
        break;
      case 'ERROR':
        colour = colours.danger;
        break;
    }

    return colour;
  }

  renderIcon() {
    if (!this.props.icon) {
      return;
    }

    let icon;
    switch (this.props.icon.toUpperCase()) {
      case 'SUCCESS':
        icon = (
          <span className='icon'>
            <CheckCircle />
          </span>
        );
        break;

      case 'ERROR':
        icon = (
          <span className='icon'>
            <ErrorCircle />
          </span>
        );
        break;

      case 'INFO':
        icon = (
          <span className='icon'>
            <Announcement />
          </span>
        );
        break;
    }

    return icon;
  }

  renderTitle() {
    // let icon = this.renderIcon();
    let title = this.props.title;

    switch (this.props.type.toUpperCase()) {
      case 'SUCCESS':
        title = 'Success!';
        break;

      case 'ERROR':
        title = 'Oh no, something happened...';
        break;
    }

    return title;
  }

  renderContents() {
    return (
      <div className='content'>
        {this.props.message}
      </div>
    );
  }

  render() {
    let title = this.renderTitle(),
        contents = this.renderContents();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className='rc-Popup'>
          <Dialog
            title={title}
            actions={this.props.buttons}
            modal={!this.props.allowClickAway || this.props.type === 'CONFRIM'}
            open={this.props.open}
            onRequestClose={this.handleRequestClose}
          >
            {contents}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

Popup.displayName = 'Popup';

const {any, array, bool, func, number, string} = React.PropTypes;

Popup.propTypes = {
  open: bool.isRequired,
  message: string.isRequired,
  title: string,
  buttons: array,
  type: React.PropTypes.oneOf(['SUCCESS', 'ERROR', 'CONFIRM', 'DEFAULT']),
  // icon: React.PropTypes.oneOf(['SUCCESS', 'ERROR', 'INFO', 'NONE']), // TODO: add ability to display Icon
  onClose: func.isRequired,
  allowClickAway: bool
};

Popup.defaultProps = {
  open: false,
  allowClickAway: true,
  type: 'DEFAULT',
  // icon: 'NONE'
};
