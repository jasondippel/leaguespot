import React from "react";
import { Link } from "react-router";
import customTheme from '../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
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
    let activeFantasyLeague = FantasyLeagueStore.getActiveFantasyLeague();
    let fantasyTeams;
    let myFantasyTeam;
    let userId = UserStore.getUserId();

    if(activeFantasyLeague) {
      fantasyTeams = FantasyTeamStore.getFantasyTeams(activeFantasyLeague.fleague_id);
      myFantasyTeam = this.findMyFantasyTeam(userId);
    }

    this.state = {
      fantasyLeague: activeFantasyLeague,
      fantasyTeams: fantasyTeams,
      myFantasyTeam: myFantasyTeam
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
    let userId = UserStore.getUserId();

    // find user's fantasy team if it exists
    let myFantasyTeam = this.findMyFantasyTeam(userId);

    this.setState({
      fantasyTeams: FantasyTeamStore.getFantasyTeams(fleagueId),
      myFantasyTeam: myFantasyTeam
    });
  }

  setMyFantasyTeam() {
    let fleagueId = this.state.activeFantasyLeague.fleague_id;
    let fantasyTeams = FantasyTeamStore.getFantasyTeams(fleagueId);
    let userId = UserStore.getUserId();

    if(!fantasyTeams) return;

    // find user's fantasy team if it exists
    let myFantasyTeam = this.findMyFantasyTeam(userId);

    this.setState({
      myFantasyTeam: myFantasyTeam
    });
  }

  findMyFantasyTeam(myId) {
    if(!this.props || !this.props.params || !this.props.params.fleagueId) return;

    let fleagueId = this.props.params.fleagueId;
    let fantasyTeams = FantasyTeamStore.getFantasyTeams(fleagueId);

    if(!fantasyTeams || !myId) return null;

    // loop through list of fantasy teams; if contains a team where user_id === myId
    // then we've found it; else return null
    let i = 0;

    for(; i < fantasyTeams.length; i++) {
      let fantasyTeam = fantasyTeams[i];
      if(fantasyTeam.user_id === myId) {
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
          <button
            className="btn greenSolidBtn"
            >
            Create a Team!
          </button>
        </div>
      );
    }
    else {
      let that = this;
      fantasyTeams.map(function(teamData, index) {
        let rightIcon = that._getRightButton(teamData);

        if(index === (fantasyTeams.length - 1) ) {
          fantasyTeamsList.push(
            <ListItem
              primaryText = {
                teamData.team_name
              }
              rightIcon = {
                rightIcon
              }
            />
          );
        } else {
          fantasyTeamsList.push(
            <span>
              <ListItem
                primaryText = {
                  teamData.team_name
                }
                rightIcon = {
                  rightIcon
                }
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

    // get all fantasy teams in the league
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

  render() {
    let that = this;

    // if fantasyLeague info isn't loaded yet, display loading page until it is
    if(!this.state.fantasyLeague) {
      return (
        <LoadingScreen />
      )
    }

    let fantasyTeamsComponent = this.getFantasyTeams();

    console.log("my fantasy team", that.state.myFantasyTeam);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="greyContainer">

            <div className="column2 sideMenu">

              <div className="column12 mainTitle">
                Team Highlights
              </div>

              <div className="column12 actionButtons">
                {
                  that.state.myFantasyTeam ?
                    <button
                      className="btn greenSolidBtn"
                      data-teamId={this.state.myFantasyTeam.fteam_id}
                      onClick={that._goToDraftTeam.bind(that)}
                      >
                      Draft your team!
                    </button>
                    : <Spinner />
                }
              </div>

            </div>

            <div className="column10 darkContainer">

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
                </div>
              </div>

              <div className='column6 standardContainer left'>
                <Tabs style={{backgroundColor: 'rgb(47, 49, 55)'}}>
                  <Tab label="Teams" >
                    {fantasyTeamsComponent}
                  </Tab>
                </Tabs>
              </div>

            </div>

        </div>
      </MuiThemeProvider>
    );

  }
}
