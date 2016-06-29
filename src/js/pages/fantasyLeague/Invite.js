import React from "react";
import { Link } from "react-router";
import customTheme from '../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';

import APIRequest from "../../scripts/APIRequest";
import FantasyLeagueStore from "../../stores/FantasyLeagueStore";
import * as FantasyLeagueActions from "../../actions/FantasyLeagueActions";
import LoadingScreen from "../LoadingScreen";
import UserInviteList from "../../components/fantasyLeague/UserInviteList";

export default class Invite extends React.Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
      dialogMessage: "",
      fantasyLeague: FantasyLeagueStore.getActiveFantasyLeague(),
      emailList: []
    }
  }

  componentWillMount() {
    FantasyLeagueStore.on("change", this.setActiveFantasyLeague.bind(this));
  }

  componentDidMount() {
    if(!this.state.fantasyLeague) {
      FantasyLeagueActions.loadActiveFantasyLeague(this.props.params.fleagueId );
    }
  }

  componentWillUnmount() {
    FantasyLeagueStore.removeListener("change", this.setActiveFantasyLeague.bind(this));
  }

  setActiveFantasyLeague() {
    this.setState({
      fantasyLeague: FantasyLeagueStore.getActiveFantasyLeague()
    });
  }

  _goToLeagueDashboard() {
    let leagueId = this.props.params.fleagueId;
    this.props.history.push("/fantasyLeague/" + leagueId + "/dashboard");
  }

  handleUserEmailChange(newEmailList) {
    this.setState({
      emailList: newEmailList
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

  inviteUsers() {
    this.setState({
      dialogMessage: "Successfully invited users"
    });
    this._handleDialogOpen();
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
        onClick={this._handleDialogClose.bind(that)} >
        Close
      </button>,
      <button
        className="btn simpleDarkBtn brightBackground"
        onClick={this._goToLeagueDashboard.bind(that)} >
        To Dashboard
      </button>
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="darkContainer">

            <div className="column12 leagueBanner">
              <div className="column8">
                <span className="title">Invite Users</span><br/>
                <span className="subtext below small">{that.state.fantasyLeague.fleague_name}</span>
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

            <div className="column3"></div>

            <div className="column6">
              <div className="column12 standardContainer grey">
                <UserInviteList
                  inviteUsersFunction={that.inviteUsers.bind(that)}
                  handleUserEmailChange={that.handleUserEmailChange.bind(that)} />
              </div>

              <div className="column12 padTopSmall right">
                <button
                  className="btn greenSolidBtn"
                  onClick={that.inviteUsers.bind(that)}
                  >
                  Send Invites
                </button>
              </div>
            </div>

            <div className="column3"></div>


            <Dialog
              actions={actions}
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={this._handleDialogClose}
            >
              {this.state.dialogMessage}
            </Dialog>

        </div>
      </MuiThemeProvider>
    );

  }
}
