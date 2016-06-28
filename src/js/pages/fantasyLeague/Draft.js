import React from "react";
import customTheme from '../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import Scrollbars from 'react-custom-scrollbars';

import PlayerList from '../../components/player/playerList';

export default class Draft extends React.Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: ""
    };
  }

  _handleDialogOpen = () => {
    this.setState({
      dialogOpen: true
    });
  };

  _handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  _handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true
    });
  };

  _handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  };

  _showPlayerInfo(event) {
    this._handleOpenDialog();
  }

  _addPlayer(event) {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: "Player added to active roster"
    });
    this._handleSnackbarOpen();

    event.stopPropagation();
  }

  _removePlayer(event) {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: "Player removed from active roster"
    });
    this._handleSnackbarOpen();

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
                  <Scrollbars style={{ height: "50vh" }}>
                    <PlayerList
                      addPlayerOption={true}
                      showPlayerInfo={that._showPlayerInfo.bind(this)}
                      addPlayer={that._addPlayer.bind(this)}
                      removePlayer={that._removePlayer.bind(this)}
                      />
                  </Scrollbars>
                </Tab>
                <Tab label="WNBA" >
                  <Scrollbars style={{ height: "50vh" }}>
                    <PlayerList
                      addPlayerOption={true}
                      showPlayerInfo={that._showPlayerInfo.bind(this)}
                      addPlayer={that._addPlayer.bind(this)}
                      removePlayer={that._removePlayer.bind(this)}
                      />
                  </Scrollbars>
                </Tab>
                <Tab label="NCAA Men's" >
                  <Scrollbars style={{ height: "50vh" }}>
                    <PlayerList
                      addPlayerOption={true}
                      showPlayerInfo={that._showPlayerInfo.bind(this)}
                      addPlayer={that._addPlayer.bind(this)}
                      removePlayer={that._removePlayer.bind(this)}
                      />
                  </Scrollbars>
                </Tab>
              </Tabs>

            </div>

            <div className="column5 standardContainer right">

              <div className="column6">
                <h3>Selected Team</h3>
              </div>
              <div className="column3">
                <label>$50,000<br/>
                <span className="subtext below">Salary Remaining</span>
                </label>
              </div>
              <div className="column3">
                <label>$50,000<br/>
                <span className="subtext below">Payroll</span>
                </label>
              </div>

              <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                <Tab label="Roster" >
                  <Scrollbars style={{ height: "50vh" }}>
                    <PlayerList
                      removePlayerOption={true}
                      showPlayerInfo={that._showPlayerInfo.bind(this)}
                      addPlayer={that._addPlayer.bind(this)}
                      removePlayer={that._removePlayer.bind(this)}
                      />
                  </Scrollbars>
                </Tab>
              </Tabs>
              <br/>

              <div className="column12 right">
                <RaisedButton label="Finalize Selection" primary={true} />
              </div>
              <br/>

            </div>

            <Dialog
              actions={actions}
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={this._handleDialogClose}
            >
              Player Info
            </Dialog>

            <Snackbar
              open={this.state.snackbarOpen}
              message={this.state.snackbarMessage}
              autoHideDuration={3000}
              onRequestClose={this._handleSnackbarClose}
              bodyStyle={{textAlign: 'center'}}
            />

          </div>
        </MuiThemeProvider>

      </div>
    );
  }
}
