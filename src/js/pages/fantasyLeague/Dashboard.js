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
    if(activeFantasyLeague) {
      fantasyTeams = FantasyTeamStore.getFantasyTeams(activeFantasyLeague.fleague_id);
    }

    this.state = {
      fantasyLeague: activeFantasyLeague,
      fantasyTeams: fantasyTeams
    }
  }

  componentWillMount() {
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

    this.setState({
      fantasyTeams: FantasyTeamStore.getFantasyTeams(fleagueId)
    });
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
    }
    else if(fantasyTeamList.length === 0) {
      // no fteams in fleague
      return (
        <div>
          No teams in fleague
        </div>
      );
    }
    else {
      // have teams so display them
      return (
        <div>
          There be teams
        </div>
      );
    }

    // Find user's fantasy team. If they don't have one, show create message

  }

  _inviteUsers() {
    let fleagueId = this.props.params.fleagueId;
    this.props.history.push("/fantasyLeague/" + fleagueId + "/draft");
  }

  _goToDraftTeam() {
    let fleagueId = this.props.params.fleagueId;
    this.props.history.push("/fantasyLeague/" + fleagueId + "/draft");
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

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="greyContainer">

            <div className="column2 sideMenu">

              <div className="column12 mainTitle">
                Team Highlights
              </div>

              <div className="column12 actionButtons">
                <button
                  className="btn greenSolidBtn"
                  data-leagueId={123}
                  onClick={that._goToDraftTeam.bind(that)}
                  >
                  Draft your team!
                </button>
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
