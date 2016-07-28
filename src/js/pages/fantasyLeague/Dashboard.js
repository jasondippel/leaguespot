import React from "react";
import { Link } from "react-router";
import customTheme from '../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import Spinner from "../../components/loading/Spinner";

import APIRequest from "../../scripts/APIRequest";
import UserStore from "../../stores/UserStore";
import FantasyTeamStore from "../../stores/FantasyTeamStore";
import * as FantasyTeamActions from "../../actions/FantasyTeamActions";
import FantasyLeagueStore from "../../stores/FantasyLeagueStore";
import * as FantasyLeagueActions from "../../actions/FantasyLeagueActions";
import LoadingScreen from "../LoadingScreen";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    let userId = UserStore.getUserId();
    let activeFantasyLeague = FantasyLeagueStore.getActiveFantasyLeague();
    let fantasyTeams;
    let myFantasyTeam;

    if(activeFantasyLeague) {
      fantasyTeams = FantasyTeamStore.getFantasyTeams(activeFantasyLeague.fleague_id);
      myFantasyTeam = this.findMyFantasyTeam(fantasyTeams, userId);
    }

    this.state = {
      fantasyLeague: activeFantasyLeague,
      fantasyTeams: fantasyTeams,
      myFantasyTeam: myFantasyTeam,
      fantasyTeamCreationName: "",
      fantasyTeamCreationErrorMessage: "",
      createTeamDialogOpen: false,
      leaveLeagueDialogOpen: false,
      deleteLeagueDialogOpen: false
    }
  }


  componentWillMount() {
    UserStore.on("change", this.setMyFantasyTeam.bind(this));
    FantasyLeagueStore.on("change", this.setActiveFantasyLeague.bind(this));
    FantasyTeamStore.on("change", this.setFantasyTeams.bind(this));
  }


  componentDidMount() {
    if(!this.state.fantasyLeague) {
      FantasyLeagueActions.loadActiveFantasyLeague(this.props.params.fleagueId);
    }
    else if(!this.state.fantasyTeams) {
      FantasyTeamActions.loadFantasyTeams(this.props.params.fleagueId);
    }
  }


  componentWillUnmount() {
    UserStore.removeListener("change", this.setMyFantasyTeam.bind(this));
    FantasyLeagueStore.removeListener("change", this.setActiveFantasyLeague.bind(this));
    FantasyTeamStore.removeListener("change", this.setFantasyTeams.bind(this));
  }


  setActiveFantasyLeague() {
    this.setState({
      fantasyLeague: FantasyLeagueStore.getActiveFantasyLeague()
    });
  }


  setFantasyTeams() {
    let fleagueId = this.props.params.fleagueId;
    let fantasyTeams = FantasyTeamStore.getFantasyTeams(fleagueId);
    let userId = UserStore.getUserId();
    let myFantasyTeam = this.findMyFantasyTeam(fantasyTeams, userId);

    this.setState({
      fantasyTeams: fantasyTeams,
      myFantasyTeam: myFantasyTeam
    });
  }


  setMyFantasyTeam() {
    let fleagueId = this.props.params.fleagueId;
    let fantasyTeams = FantasyTeamStore.getFantasyTeams(fleagueId);
    let userId = UserStore.getUserId();
    let myFantasyTeam = this.findMyFantasyTeam(fantasyTeams, userId);

    this.setState({
      myFantasyTeam: myFantasyTeam
    });
  }


  findMyFantasyTeam(fantasyTeams, userId) {
    if(!fantasyTeams || !userId) return null;

    // loop through list of fantasy teams; if contains a team where user_id === myId
    // then we've found it; else return null
    let i = 0;

    for(; i < fantasyTeams.length; i++) {
      let fantasyTeam = fantasyTeams[i];
      if(fantasyTeam.user_id === userId) {
        return fantasyTeam;
      }
    }

    return null;
  }


  _getRightButton(teamData) {
    let myId = UserStore.getUserId();

    if(teamData.user_id === myId && Object.keys(teamData.roster).length === 0) {
      // select roster button
      return (
        <button
          className="btn listButton"
          data-teamId={teamData.fteam_id}
          onClick={this._goToDraftTeam.bind(this)} >
          Draft
        </button>
      )
    } else {
      // TODO: view team button
      return (
        <button
          className="btn listButton"
          data-teamId={teamData.fteam_id} >
          View
        </button>
      );
    }
  }

  _getTeamName(teamData) {
    let myId = UserStore.getUserId();
    let myTeamStyle = {
      color: '#49b64d'
    };

    if(teamData.user_id === myId) {
      return (
        <span style={myTeamStyle}>{teamData.team_name}</span>
      )
    } else {
      return teamData.team_name;
    }
  }


  getFantasyTeamsList() {
    let fantasyTeams = this.state.fantasyTeams;
    let fantasyTeamsList = [];

    if(fantasyTeams.length === 0) {
      // no fteams in fleague
      return (
        <div className="column12 center brightSecondaryText">
          <p>There's no teams in this league yet!</p>
        </div>
      );
    }
    else {
      let that = this;

      fantasyTeams.map(function(teamData, index) {
        let rightIcon = that._getRightButton(teamData);
        let teamName = that._getTeamName(teamData);
        let standingsInfo = (
          <div className="column12 subtext skinny">
            <div className="column4">
              Standing: -
            </div>
            <div className="column4">
              Movement: -
            </div>
          </div>
        );

        if(index === (fantasyTeams.length - 1) ) {
          fantasyTeamsList.push(
            <ListItem
              primaryText = {teamName}
              secondaryText = {standingsInfo}
              rightIcon = {
                rightIcon
              }
              disabled={true}
            />
          );
        } else {
          fantasyTeamsList.push(
            <span>
              <ListItem
                primaryText = {teamName}
                secondaryText = {standingsInfo}
                rightIcon = {
                  rightIcon
                }
                disabled={true}
              />
            <Divider />
          </span>
          );
        }

      });
    }
    return fantasyTeamsList;
  }


  getFantasyTeams() {
    let fleagueId = this.props.params.fleagueId;
    let fantasyTeamList = this.state.fantasyTeams;

    if(!fantasyTeamList) {
      // loading
      return (
        <Spinner />
      );
    } else {
      let teamsList = this.getFantasyTeamsList();
      return (
        <List>
          {teamsList}
        </List>
      );
    }
  }


  getSideBar() {
    let myFantasyTeam = this.state.myFantasyTeam;
    let fleagueId = this.props.params.fleagueId;
    let that = this;

    if(!myFantasyTeam) {
      return (
        <div className="column12 actionButtons">
          <p className="brightSecondaryText">You haven't created your team yet!</p>
          <button
            className="btn greenSolidBtn"
            data-fleagueId={fleagueId}
            onClick={this._displayCreateTeam.bind(this)}
            >
            Create a Team!
          </button>
        </div>
      );
    }
    else if(Object.keys(myFantasyTeam.roster).length === 0) {
      return (
        <div className="column12 actionButtons">
          <p className="brightSecondaryText">There are no players on your team!</p>
          <button
            className="btn greenSolidBtn"
            data-teamId={myFantasyTeam.fteam_id}
            onClick={this._goToDraftTeam.bind(this)}
            >
            Draft Your Team!
          </button>
        </div>
      );
    } else {
      return (
        <p>Team breakdown will go here...</p>
      );
    }
  }


  getLeaveButton() {
    if(!this.state.fantasyLeague) {
      return;
    }

    let userEmail = UserStore.getEmail();

    // if user is only admin and no other members, show delete league button
    if(Object.keys(this.state.fantasyLeague.users).length === 1
      && Object.keys(this.state.fantasyLeague.fleague_admins).length === 1
      && this.state.fantasyLeague.fleague_admins[userEmail]) {
      return (
        <button
          className="btn simpleDarkBtn redHover"
          onClick={this._displayDeleteLeague.bind(this)}
          >
          Delete League
        </button>
      );
    }

    // if user is not admin, show leave button
    if(!this.state.fantasyLeague.fleague_admins[userEmail]) {
      return (
        <button
          className="btn simpleDarkBtn redHover"
          onClick={this._displayLeaveLeague.bind(this)}
          >
          Leave League
        </button>
      );
    }
  }


  getCreateTeamDialog() {
    const actions = [
      <button
        className="btn simpleGreenBtn brightBackground"
        onClick={this._createTeam.bind(this)} >
        Create
      </button>,
      <button
        className="btn simpleGreyBtn brightBackground"
        onClick={this._handleDialogClose.bind(this)} >
        Close
      </button>
    ];

    return (
      <Dialog
        actions={actions}
        modal={true}
        open={this.state.dialogOpen}
      >
        <div>
          <div className="column12">
            <span className="title">Create Team</span>
          </div>

          <div className="column12">
            <TextField
              onChange={this._handleFantasyTeamCreationNameChange.bind(this)}
              floatingLabelText="Fantasy Team Name"
              value={ this.state.fantasyTeamCreationName !== "" ? this.state.fantasyTeamCreationName : null } />
          </div>

          <div className="column12">
            <span className="failureMessage">{this.state.fantasyTeamCreationErrorMessage}</span>
          </div>

        </div>
      </Dialog>
    )
  }


  getLeaveLeagueDialog() {
    const actions = [
      <button
        className="btn simpleGreenBtn brightBackground"
        onClick={this.leaveLeague.bind(this)} >
        Yes
      </button>,
      <button
        className="btn simpleGreyBtn brightBackground"
        onClick={this._handleDialogClose.bind(this)} >
        No
      </button>
    ];

    return (
      <Dialog
        actions={actions}
        modal={true}
        open={this.state.dialogOpen}
      >
        <div>
          <div className="column12">
            <span className="title">Leave League</span>
          </div>

          <div className="column12 brightSecondaryText">
            <p>Are you sure you want to leave this league?</p>
          </div>

        </div>
      </Dialog>
    )
  }


  getDeleteLeagueDialog() {
    const actions = [
      <button
        className="btn simpleGreenBtn brightBackground"
        onClick={this.deleteLeague.bind(this)} >
        Yes
      </button>,
      <button
        className="btn simpleGreyBtn brightBackground"
        onClick={this._handleDialogClose.bind(this)} >
        No
      </button>
    ];

    return (
      <Dialog
        actions={actions}
        modal={true}
        open={this.state.dialogOpen}
      >
        <div>
          <div className="column12">
            <span className="title">Delte League</span>
          </div>

          <div className="column12 brightSecondaryText">
            <p>Are you sure you want to delete this league? Once you do, you won't be able to get it back.</p>
          </div>

        </div>
      </Dialog>
    );
  }


  getDialog() {
    let dialog = "";

    if(this.state.createTeamDialogOpen) {
      dialog = this.getCreateTeamDialog();
    } else if(this.state.leaveLeagueDialogOpen) {
      dialog = this.getLeaveLeagueDialog();
    } else if(this.state.deleteLeagueDialogOpen) {
      dialog = this.getDeleteLeagueDialog();
    }

    return dialog;
  }


  getMembersList() {
    if(!this.state.fantasyLeague) {
      return (
        <div className="column12 center brightSecondaryText">
          <p>No members found</p>
        </div>
      );
    }

    let userKeys = Object.keys(this.state.fantasyLeague.users);
    let users = this.state.fantasyLeague.users;
    let usersList = [];

    userKeys.map(function(key, index) {
      if(index === userKeys.length - 1) {
        usersList.push(
          <ListItem
            primaryText = {users[key].full_name}
            disabled={true}
          />
        );
      }
      else {
        usersList.push(
          <span>
            <ListItem
              primaryText = {users[key].full_name}
              disabled={true}
            />
          <Divider/>
          </span>
        );
      }

    });

    return (
      <List>
        {usersList}
      </List>
    );
  }


  deleteLeague() {
    let fleagueId = this.state.fantasyLeague.fleague_id;
    this._handleDialogClose();

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/delete",
      data: {
        fleague_id: fleagueId
      }
    }).then((resp) => {
      if(resp.success) {
        FantasyLeagueActions.removeLeagueById(fleagueId);
        this.props.history.push("/dashboard");
      }
      else {
        alert("Failed to leave league cleanly.");
        console.log("Leave league failed", resp);
      }
    }).catch((error) => {
      alert("Error making request");
      console.log("Error making request: ", error);
    });
  }


  leaveLeague(event) {
    let fleagueId = this.state.fantasyLeague.fleague_id;
    this._handleDialogClose();

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/leave",
      data: {
        fleague_id: fleagueId
      }
    }).then((resp) => {
      if(resp.success) {
        FantasyLeagueActions.removeLeagueFromMyLeaguesById(fleagueId);
        this.props.history.push("/dashboard");
      }
      else {
        alert("Failed to leave league cleanly.");
        console.log("Leave league failed", resp);
      }
    }).catch((error) => {
      alert("Error making request");
      console.log("Error making request: ", error);
    });
  }


  _createTeam() {
    if(!this.state.fantasyTeamCreationName) {
      this.setState({
        fantasyTeamCreationErrorMessage: "You must enter a team name"
      });
      return;
    }

    let that = this;
    let data = {
      fleague_id: this.props.params.fleagueId,
      team_name: this.state.fantasyTeamCreationName
    };

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_teams/create",
      data: data
    }).then((resp) => {
      if(resp.success) {
        FantasyTeamStore.addFantasyTeam(that.props.params.fleagueId, resp.team)
        that._handleDialogClose();
      }
      else {
        this.setState({
          fantasyTeamCreationErrorMessage: "Failed to create team: " + resp.message
        });
        return;
      }
    }).catch((error) => {
      this.setState({
        fantasyTeamCreationErrorMessage: "Error making request: " + error
      });
      console.log("Error making request: ", error);
    });
  }


  _inviteUsers() {
    let fleagueId = this.props.params.fleagueId;
    this.props.history.push("/fantasyLeague/" + fleagueId + "/draft");
  }


  _goToDraftTeam(event) {
    let fleagueId = this.props.params.fleagueId;
    let teamId = event.target.dataset.teamid;
    this.props.history.push("/fantasyLeague/" + fleagueId + "/" + teamId + "/draft");
  }


  _goToLeagueDashboard() {
    let fleagueId = this.state.fantasyLeague.fleague_id;
    this.props.history.push("/fantasyLeague/" + fleagueId + "/dashboard");
  }


  _goToInviteUsers() {
    let fleagueId = this.state.fantasyLeague.fleague_id;
    this.props.history.push("/fantasyLeague/" + fleagueId + "/invite");
  }


  _displayCreateTeam() {
    this.setState({
      dialogOpen: true,
      createTeamDialogOpen: true
    });
  }


  _displayDeleteLeague() {
    this.setState({
      dialogOpen: true,
      deleteLeagueDialogOpen: true
    });
  }


  _displayLeaveLeague() {
    this.setState({
      dialogOpen: true,
      leaveLeagueDialogOpen: true
    });
  }


  _handleDialogClose = () => {
    this.setState({
      fantasyTeamCreationErrorMessage: "",
      fantasyTeamCreationName: "",
      dialogOpen: false,
      createTeamDialogOpen: false,
      deleteLeagueDialogOpen: false,
      leaveLeagueDialogOpen: false
    });
  };


  _handleFantasyTeamCreationNameChange(event) {
    let newValue = event.target.value;
    this.setState({
      fantasyTeamCreationName: newValue
    });
  }


  render() {
    let that = this;

    // if fantasyLeague info isn't loaded yet, display loading page until it is
    if(!this.state.fantasyLeague) {
      return (
        <LoadingScreen />
      )
    }

    let fantasyTeamsComponent = this.getFantasyTeams();
    let sideBarComponent = this.getSideBar();
    let leaveButton = this.getLeaveButton();
    let membersList = this.getMembersList();
    let dialog = this.getDialog();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="greyContainer">

            <div className="column3 sideMenu">

              <div className="column12 mainTitle">
                Team Highlights
              </div>

              {sideBarComponent}

            </div>

            <div className="column9 darkContainer">

              <div className="column12 leagueBanner">
                <div className="column8">
                  <span className="title">{that.state.fantasyLeague.fleague_name}</span><br/>
                  <span className="subtext below small">Fantasy League</span>
                </div>
                <div className="column4 right" style={{paddingTop: "1.5em"}}>
                  <button
                    className="btn simpleDarkBtn"
                    onClick={that._goToInviteUsers.bind(that)}
                    >
                    Invite Users
                  </button>
                  {leaveButton}
                </div>
              </div>

              <div className='column8 standardContainer left'>
                <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                  <Tab label="Standings" >
                    {fantasyTeamsComponent}
                  </Tab>
                </Tabs>
              </div>

              <div className='column4 standardContainer left'>
                <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                  <Tab label="Members" >
                    <div>
                      {membersList}
                    </div>
                  </Tab>
                </Tabs>
              </div>

            </div>

            {dialog}

        </div>
      </MuiThemeProvider>
    );

  }
}
