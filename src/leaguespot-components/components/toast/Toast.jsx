/**
 * @module components/toast/Toast
 */

/* Style Dependencies */
import './Toast.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import Snackbar from 'material-ui/Snackbar';
import ErrorCircle from 'material-ui/svg-icons/alert/error';
import Announcement from 'material-ui/svg-icons/action/announcement';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

/* Material UI Theme */
import customTheme from '../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose()  {
    if (this.props.onClose) {
        this.props.onClose();
    }
  }

  renderContents() {
    let classes = 'message';
    let icon = (
      <span style={{verticalAlign: 'middle'}}>
        <Announcement />
      </span>
    );

    switch (this.props.type.toUpperCase()) {
      case 'ERROR':
        classes += ' error';
        icon = (
          <span>
            <ErrorCircle />
          </span>
        );
        break;
      case 'SUCCESS':
        classes += ' success';
        icon = (
          <span>
            <CheckCircle />
          </span>
        );
        break;
    }

    return (
      <div className={classes}>
        {icon}
        {this.props.message}
      </div>
    );
  }

  render() {
    let contents = this.renderContents();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className='rc-Toast'>
          <Snackbar
            open={this.props.open}
            message={contents}
            autoHideDuration={6000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Toast.displayName = 'Toast';

const {any, bool, func, number, string} = React.PropTypes;

Toast.propTypes = {
  open: bool.isRequired,
  message: string.isRequired,
  type: React.PropTypes.oneOf(['SUCCESS', 'ERROR', 'DEFAULT']),
  onClose: func.isRequired
};

Toast.defaultProps = {
  open: false
};
