import React from "react";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Scrollbars from 'react-custom-scrollbars';

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

        <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
          <div>
            <div className="column7 standardContainer left">

              <h3>Player Pool</h3>

              <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}} >
                <Tab label="NBA" >
                  <Scrollbars style={{ height: 300 }}>
                    <PlayerList addPlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(this)} />
                  </Scrollbars>
                </Tab>
                <Tab label="WNBA" >
                  <Scrollbars style={{ height: 300 }}>
                    <PlayerList addPlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(this)} />
                  </Scrollbars>
                </Tab>
                <Tab label="NCAA Men's" >
                  <Scrollbars style={{ height: 300 }}>
                    <PlayerList addPlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(this)} />
                  </Scrollbars>
                </Tab>
              </Tabs>

            </div>

            <div className="column5 standardContainer right">

              <h3>Selected Team</h3>

                <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                  <Tab label="Roster" >
                    <Scrollbars style={{ height: 300 }}>
                      <PlayerList removePlayerOption={true} showPlayerInfo={that._showPlayerInfo.bind(that)} />
                    </Scrollbars>
                  </Tab>
                </Tabs>

            </div>

            <div className="column12 standardContainer">

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
