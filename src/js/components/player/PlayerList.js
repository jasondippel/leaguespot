import React from "react";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green500, red700} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

export default class PlayerListItem extends React.Component {
  constructor() {
    super();
  }

  _showPlayerInfo(event) {
    this.props.showPlayerInfo(event);
  }

  _addPlayer(event) {
    console.log("player added", event);
    event.stopPropagation();
  }

  _removePlayer(event) {
    console.log("player removed", event);
    event.stopPropagation();
  }

  render() {
    let that = this;

    let rightIcon = "";
    if (this.props.removePlayerOption) {
      rightIcon = (<RemoveCircle onTouchTap={that._removePlayer}
        hoverColor={red700}
        iconStyle={{width: '24px', height: '24px'}}
        style={{width: '32px', height: '32px', top: '0px'}}
        />);
    }
    else if (this.props.addPlayerOption) {
      rightIcon = (<AddCircle onTouchTap={that._addPlayer}
        hoverColor={green500}
        iconStyle={{width: '24px', height: '24px'}}
        style={{width: '32px', height: '32px', top: '0px'}}
        />);
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <List>
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo.bind(that)} />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            onTouchTap={that._showPlayerInfo.bind(that)}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo.bind(that)} />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            onTouchTap={that._showPlayerInfo.bind(that)}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo.bind(that)} />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            onTouchTap={that._showPlayerInfo.bind(that)}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo.bind(that)} />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            onTouchTap={that._showPlayerInfo.bind(that)}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo.bind(that)} />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            onTouchTap={that._showPlayerInfo.bind(that)}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo.bind(that)} />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            onTouchTap={that._showPlayerInfo.bind(that)}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo.bind(that)} />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            onTouchTap={that._showPlayerInfo.bind(that)}
          />
        </List>
      </MuiThemeProvider>
    );
  }
}
