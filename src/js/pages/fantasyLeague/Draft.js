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
      maxRosterCost: 60000,
      playerList: PlayerStore.getPlayers()  // add field player.hideDisplay?
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
    // get player object from list
    let index = event.target.dataset.index;
    let masterIndex = event.target.dataset.masterindex;
    let leagueId = event.target.dataset.leagueid;
    let newPlayerList = this.state.playerList;
    let newSelectedRoster = this.state.selectedRoster;
    let originalPlayerObj = newPlayerList[leagueId][index];

    // do we have an open roster spot?
    if(this.state.selectedRoster.length + 1 > this.state.rosterSize) {
      this.setState({
        snackbarMessage: "You don't have any open spots on your roster."
      });
      this._handleSnackbarOpen();
      return;
    }

    // do we have the capspace for the player?
    if(parseInt(this.state.selectedRosterCost) + parseInt(originalPlayerObj.cost) > parseInt(this.state.maxRosterCost)) {
      this.setState({
        snackbarMessage: "You don't have enough money left to afford this player."
      });
      this._handleSnackbarOpen();
      return;
    }

    // hide in master list and give masterIndex val
    newPlayerList[leagueId][index].hideOnDisplay = true;
    newPlayerList[leagueId][index].masterIndex = masterIndex;

    // add player to selected list
    newSelectedRoster.push(originalPlayerObj);
    let newSelectedRosterCost = parseInt(this.state.selectedRosterCost) + parseInt(originalPlayerObj.cost);

    this.setState({
      playerList: newPlayerList,
      selectedRoster: newSelectedRoster,
      selectedRosterCost: newSelectedRosterCost,
      snackbarMessage: "Player added to active roster"
    });
    this._handleSnackbarOpen();

    event.stopPropagation();
  }

  _removePlayer(event) {
    // get player object from list
    let selectedListIndex = event.target.dataset.index;
    let masterIndex = event.target.dataset.masterindex;
    let leagueId = event.target.dataset.leagueid;
    let newPlayerList = this.state.playerList;
    let newSelectedRoster = this.state.selectedRoster;

    // remove player from selectedRoster and add back to playerList
    newPlayerList[leagueId][masterIndex].hideOnDisplay = false;
    let removedPlayer = newSelectedRoster.splice(selectedListIndex, 1);

    // updated selectedRosterCost
    let newSelectedRosterCost = parseInt(this.state.selectedRosterCost) - parseInt(newPlayerList[leagueId][masterIndex].cost);

    this.setState({
      playerList: newPlayerList,
      selectedRoster: newSelectedRoster,
      selectedRosterCost: newSelectedRosterCost,
      snackbarMessage: "Player removed from active roster"
    });
    this._handleSnackbarOpen();

    event.stopPropagation();
  }

  _finalizeTeam() {
    if(this.state.selectedRoster.length < this.state.rosterSize) {
      this.setState({
        dialogMessage: "You don't have a full roster yet! You must select " + this.state.rosterSize + " players before continuing."
      });
      this._handleDialogOpen();
      return;
    }
    if(this.state.selectedRoster.length > this.state.rosterSize) {
      this.setState({
        dialogMessage: "You're a wizard! Somehow you managed to select too many players. Please only select " + this.state.rosterSize + " players."
      });
      this._handleDialogOpen();
      return;
    }

    if(parseInt(this.state.selectedRosterCost) > parseInt(this.state.maxRosterCost)) {
      this.setState({
        dialogMessage: "You're a wizard! Somehow you managed to select a roster that exceeds your maximum salary allowance. You may only submit a roster that has a payroll of $" + this.numberWithCommas(this.state.maxRosterCost) + " or less."
      });
      this._handleDialogOpen();
      return;
    }

    this.setState({
      dialogMessage: (
        <div>
          Finalizing team selection...<br/>
          <LoadingScreen small={true} />
        </div>
      )
    });
    this._handleDialogOpen();

    // send call to update


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
                <Tab label={"Roster (" + this.state.selectedRoster.length + "/" + this.state.rosterSize + ")"} >
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
