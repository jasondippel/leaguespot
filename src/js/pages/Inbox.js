import React from "react";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyanA400, green500} from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import PlayerList from '../components/player/playerList';

export default class Inbox extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  _handleOpenDialog = () => {
    this.setState({open: true});
  };

  _handleCloseDialog = () => {
    this.setState({open: false});
  };

  _showPlayerInfo(event) {
    this._handleOpenDialog();
  }

  _addPlayer(event) {
    console.log("player added", event);
    event.stopPropagation();

  }

  render() {
    let that = this;

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this._handleCloseDialog}
      />
    ];

    return (
      <div className="darkContainer">
        <div className="containerBanner">
          <div className="title">Team Selection</div>
        </div>

        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <div className="column7 standardContainer left">

              <h3>Player Pool</h3>

              <Tabs style={{backgroundColor: 'rgb(47, 49, 55)', selectedTextColor: cyanA400}}>
                <Tab label="NBA" style={{backgroundColor: green500}} >
                  <div>
                    <PlayerList addPlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(this)} />
                  </div>
                </Tab>
                <Tab label="WNBA" style={{backgroundColor: green500}} >
                  <div>
                    <PlayerList addPlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(this)} />
                  </div>
                </Tab>
                <Tab label="NCAA Men's" style={{backgroundColor: green500}} >
                  <div>
                    <PlayerList addPlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(this)} />
                  </div>
                </Tab>
              </Tabs>

            </div>

            <div className="column5 standardContainer right">

              <h3>Selected Team</h3>

                <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                  <Tab label="Roster" style={{backgroundColor: green500}} >
                    <div>
                      <PlayerList removePlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(that)} />
                    </div>
                  </Tab>
                </Tabs>

            </div>

            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this._handleCloseDialog}
            >
              Player Info
            </Dialog>

          </div>
        </MuiThemeProvider>

      </div>
    );
  }
}
