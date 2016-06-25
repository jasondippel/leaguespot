import React from "react";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyanA400, green500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

export default class Inbox extends React.Component {
  constructor() {
    super();
  }

  _test() {
    alert("_test");
  }

  _showPlayerInfo(event) {
    alert("player info");
  }

  _addPlayer(event) {
    console.log("player added", event);
    event.stopPropagation();

  }

  render() {
    let that = this;

    return (
      <div className="darkContainer">
        <div className="containerBanner">

          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

            <div className="column5">

              <List>
                <ListItem
                  leftAvatar={<Avatar icon={ <AccountCircle /> } onTouchTap={that._showPlayerInfo} />}
                  rightIcon={
                    <AddCircle onTouchTap={that._addPlayer}
                      hoverColor={green500}
                      iconStyle={{width: '24px', height: '24px'}}
                      style={{width: '32px', height: '32px', top: '0px'}}
                      />
                  }
                  primaryText="Jon Doe"
                  onTouchTap={that._showPlayerInfo}
                />
              </List>

            </div>
          </MuiThemeProvider>

        </div>
      </div>
    );
  }
}
