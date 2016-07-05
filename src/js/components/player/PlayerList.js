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

  _getPlayerInfo(player) {
    return (
      <div className="column12 brightSecondaryText">
        <div className="column4">
          <span>{player.position}</span>
        </div>
        <div className="column4">
          <span>{player.pg_points} FPPG</span>
        </div>
        <div className="column4">
          <span>${player.cost}</span>
        </div>
      </div>
    );
  }

  _getRightIcon(player, index) {
    let rightIcon = "";

    if (this.props.removePlayerOption) {
      rightIcon= (
        <button
          className="btn listButton removal"
          data-leagueId={player.league}
          data-playerId={player.id}
          data-index={index}
          onClick={this._removePlayer.bind(this)} >
          Remove
        </button>
      );
    }
    else if (this.props.addPlayerOption) {
      rightIcon= (
        <button
          className="btn listButton addition"
          data-leagueId={player.league}
          data-playerId={player.id}
          data-index={index}
          onClick={this._addPlayer.bind(this)} >
          Add
        </button>
      );
    }

    return rightIcon;
  }

  render() {
    let that = this;

    if(!this.props.playerList && !this.props.selectionRoster) {
      return (
        <p>No players found</p>
      )
    }

    let listItems = [];

    if(this.props.selectionRoster) {
      let i=0;
      let maxRosterSpots = this.props.rosterSize;

      // display selected players
      for(; i < this.props.roster.length; i++) {
        let player = this.props.roster[i];
        let playerInfo = this._getPlayerInfo(player);
        let rightIcon = this._getRightIcon(player, i);

        if(i < maxRosterSpots - 1) {
          listItems.push(
            <span>
              <ListItem
                leftAvatar={<Avatar icon={ <AccountCircle /> } />}
                rightIcon={ rightIcon }
                primaryText={player.last_name + ", " + player.first_name}
                secondaryText={playerInfo}
              />
              <Divider />
            </span>
          );
        } else {
          listItems.push(
            <span>
              <ListItem
                leftAvatar={<Avatar icon={ <AccountCircle /> } />}
                rightIcon={ rightIcon }
                primaryText={player.last_name + ", " + player.first_name}
                secondaryText={playerInfo}
              />
              <Divider />
            </span>
          );
        }
      }

      // display empty slots for remaining players
      for(; i < maxRosterSpots; i++) {
        if(i < maxRosterSpots - 1) {
          listItems.push(
            <span>
              <ListItem
                leftAvatar={<Avatar icon={ <AccountCircle /> } />}
                primaryText={(<span className="brightSecondaryText">Empty</span>)}
              />
              <Divider />
            </span>
          );
        } else {
          listItems.push(
            <ListItem
              leftAvatar={<Avatar icon={ <AccountCircle /> } />}
              primaryText={(<span className="brightSecondaryText">Empty</span>)}
            />
          );
        }
      }
    }
    else if(this.props.playerList) {
      let i=0;

      // display players
      for(; i < this.props.playerList.length; i++) {
        let player = this.props.playerList[i];
        if(player.hideOnDisplay) continue;

        let playerInfo = this._getPlayerInfo(player);
        let rightIcon = this._getRightIcon(player, i);

        if(i < this.props.playerList.length - 1) {
          listItems.push(
            <span>
              <ListItem
                leftAvatar={<Avatar icon={ <AccountCircle /> } />}
                rightIcon={ rightIcon }
                primaryText={player.last_name + ", " + player.first_name}
                secondaryText={playerInfo}
              />
              <Divider />
            </span>
          );
        } else {
          listItems.push(
            <span>
              <ListItem
                leftAvatar={<Avatar icon={ <AccountCircle /> } />}
                rightIcon={ rightIcon }
                primaryText={player.last_name + ", " + player.first_name}
                secondaryText={playerInfo}
              />
              <Divider />
            </span>
          );
        }
      }
    }
    else {
      console.error("Error: Player list attempted to be created without passing in a list of players");
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <List>
          {listItems}
        </List>
      </MuiThemeProvider>
    );
  }
}
