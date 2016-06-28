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
    this.props.addPlayer(event);
    event.stopPropagation();
  }

  _removePlayer(event) {
    this.props.removePlayer(event);
    event.stopPropagation();
  }

  render() {
    let that = this;

    let rightIcon = "";
    if (this.props.removePlayerOption) {
      rightIcon= (
        <button
          className="btn listButton removal"
          data-leagueId={123}
          onClick={that._removePlayer.bind(that)} >
          Remove
        </button>
      );
    }
    else if (this.props.addPlayerOption) {
      rightIcon= (
        <button
          className="btn listButton addition"
          data-leagueId={123}
          onClick={that._addPlayer.bind(that)} >
          Add
        </button>
      );
    }

    let playerInfo=(
      <div className="column12 brightSecondaryText">
        <div className="column4">
          <span>PG</span>
        </div>
        <div className="column4">
          <span>23 FPPG</span>
        </div>
        <div className="column4">
          <span>$3000</span>
        </div>
      </div>
    )

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <List>
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            secondaryText={playerInfo}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            secondaryText={playerInfo}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            secondaryText={playerInfo}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            secondaryText={playerInfo}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            secondaryText={playerInfo}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            secondaryText={playerInfo}
          />
          <Divider />
          <ListItem
            leftAvatar={<Avatar icon={ <AccountCircle /> } />}
            rightIcon={ rightIcon }
            primaryText="Jon Doe"
            secondaryText={playerInfo}
          />
        </List>
      </MuiThemeProvider>
    );
  }
}
