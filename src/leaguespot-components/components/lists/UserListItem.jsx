/**
 * @module components/lists/base/ListItem
 */

 /* Style Dependencies */
import './PlayerListItem.less';

/* Script Dependencies */
import React from 'react';
import _ from 'underscore';
import Avatar from 'material-ui/Avatar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import ListItem from './base/ListItem';

/* Material UI Theme */
import customTheme from '../../constants/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class PlayerListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderProfilePic() {
    return (
      <Avatar icon={<AccountCircle style={{}} />} />
    );
  }

  renderButtons() {
    let buttons = [];

    // ensure each button has a key value assigned for React rendering
    _.each(this.props.buttons, (button, key) => {
        buttons.push((
          <span key={key}>
            {button}
          </span>
        ));
    });

    return (
      <div>
        {buttons}
      </div>
    );
  }

  render() {
    let profilePic,
        buttons = this.renderButtons();

    if (this.props.showProfilePic) {
      profilePic = this.renderProfilePic();
    }

    return (
      <ListItem
        itemClass='rc-UserListItem'
        mainText={this.props.userName}
        mediaLeft={profilePic}
        buttonsRight={buttons}
        />
    );
  }
}

PlayerListItem.displayName = 'PlayerListItem';

const {any, array, bool, func, number, object, string} = React.PropTypes;

PlayerListItem.propTypes = {
  userName: string.isRequired,
  buttons: array,
  profilePic: string,   // location of image
  showProfilePic: bool
};

PlayerListItem.defaultProps = {
  showProfilePic: true
};
