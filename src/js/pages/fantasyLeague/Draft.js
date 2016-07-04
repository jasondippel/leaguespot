import React from "react";
import customTheme from '../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import Scrollbars from 'react-custom-scrollbars';

import PlayerList from '../../components/player/playerList';
import FantasyLeagueStore from "../../stores/FantasyLeagueStore";
import PlayerStore from "../../stores/PlayerStore";
import * as ProLeagues from "../../scripts/ProLeagues";
import * as FantasyLeagueActions from "../../actions/FantasyLeagueActions";
import * as PlayerActions from "../../actions/PlayerActions";
import LoadingScreen from "../LoadingScreen";

export default class Draft extends React.Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
      dialogMessage: "",
      snackbarOpen: false,
      snackbarMessage: "",
      fantasyLeague: FantasyLeagueStore.getActiveFantasyLeague(),
      rosterSize: ProLeagues.getRosterSize('Basketball'),
      selectedRoster: [],
      selectedRosterCost: 0,
      maxRosterCost: 50000,
      playerList: PlayerStore.getPlayers()
    };
  }

  componentWillMount() {
    FantasyLeagueStore.on("change", this.setActiveFantasyLeague.bind(this));
    PlayerStore.on("change", this.setPlayerList.bind(this));
  }

  componentDidMount() {
    if(!this.state.fantasyLeague) {
      FantasyLeagueActions.loadActiveFantasyLeague(this.props.params.fleagueId );
    }
  }

  componentWillUnmount() {
    FantasyLeagueStore.removeListener("change", this.setActiveFantasyLeague.bind(this));
    PlayerStore.removeListener("change", this.setPlayerList.bind(this));
  }

  setActiveFantasyLeague() {
    this.setState({
      fantasyLeague: FantasyLeagueStore.getActiveFantasyLeague()
    });
  }

  setPlayerList() {
    this.setState({
      playerList: PlayerStore.getPlayers()
    });
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

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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

  _finalizeTeam() {
    this.setState({
      dialogMessage: "Sorry, not yet implemented"
    });
    this._handleDialogOpen();
  }

  _goToLeagueDashboard() {
    let leagueId = this.state.fantasyLeague.fleague_id;
    this.props.history.push("/fantasyLeague/" + leagueId + "/dashboard");
  }

  createTabs() {
    let that = this;

    let selectedLeagues = this.state.fantasyLeague.pro_leagues;

    let i=0;
    let tabList = []
    for(; i < selectedLeagues.length; i++) {
      let leagueId = selectedLeagues[i];
      let leagueName = ProLeagues.getLeagueName(leagueId);

      tabList.push(
        <Tab label={leagueName} >
            {
            that.state.playerList[leagueId] ?
              <Scrollbars style={{ height: "50vh" }}>
                <PlayerList
                  playerList={that.state.playerList[leagueId]}
                  addPlayerOption={true}
                  showPlayerInfo={that._showPlayerInfo.bind(this)}
                  addPlayer={that._addPlayer.bind(this)}
                  removePlayer={that._removePlayer.bind(this)}
                  />
              </Scrollbars>
            :
            <Scrollbars style={{ height: "50vh", backgroundColor: 'rgb(47, 49, 55)' }}>
              <LoadingScreen small={true} />
            </Scrollbars>
            }
        </Tab>
      )
    }

    return (
      <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}} >
        {tabList}
      </Tabs>
    );
  }

  render() {
    let that = this;

    // if fantasyLeague info isn't loaded yet, display loading page until it is
    if(!this.state.fantasyLeague) {
      return (
        <LoadingScreen />
      )
    }

    const actions = [
      <button
        className="btn simpleGreenBtn brightBackground"
        onClick={this._handleDialogClose.bind(this)} >
        Close
      </button>
    ];

    let tabs = this.createTabs();

    return (
      <div className="darkContainer">
        <div className="column12 leagueBanner">
            <div className="column8">
              <span className="title">Draft</span><br/>
              <span className="subtext below small">{this.state.fantasyLeague.fleague_name}</span>
            </div>
            <div className="column4 right" style={{paddingTop: "1.5em"}}>
              <button
                className="btn simpleDarkBtn"
                onClick={that._goToLeagueDashboard.bind(that)}
                >
                Back to Dashboard
              </button>
            </div>
        </div>

        <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
          <div>
            <div className="column7 standardContainer left">

              <h3>Player Pool</h3>

              { tabs }

            </div>

            <div className="column5 standardContainer right">

              <div className="column6">
                <h3>Selected Team</h3>
              </div>
              <div className="column3">
                <label>${this.numberWithCommas(this.state.maxRosterCost - this.state.selectedRosterCost)}<br/>
                <span className="subtext below">Salary Remaining</span>
                </label>
              </div>
              <div className="column3">
                <label>${this.numberWithCommas(this.state.selectedRosterCost)}<br/>
                <span className="subtext below">Payroll</span>
                </label>
              </div>

              <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                <Tab label="Roster" >
                  <Scrollbars style={{ height: "50vh" }}>
                    <PlayerList
                      selectionRoster={true}
                      rosterSize={that.state.rosterSize}
                      roster={that.state.selectedRoster}
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
                <button
                  className="btn greenSolidBtn"
                  onClick={that._finalizeTeam.bind(that)}
                  >
                  Lock in Your Team
                </button>
              </div>
              <br/>

            </div>

            <Dialog
              actions={actions}
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={this._handleDialogClose}
            >
              {this.state.dialogMessage}
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
