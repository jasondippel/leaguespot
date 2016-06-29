import React from "react";
import { Link } from "react-router";
import customTheme from '../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import APIRequest from "../../scripts/APIRequest";
import FantasyLeagueStore from "../../stores/FantasyLeagueStore";
import * as FantasyLeagueActions from "../../actions/FantasyLeagueActions";
import LoadingScreen from "../LoadingScreen";
import AddUsers from "../../components/fantasyLeague/AddUsers";

export default class Invite extends React.Component {
  constructor() {
    super();

    this.state = {
      fantasyLeague: FantasyLeagueStore.getActiveFantasyLeague()
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

  inviteUsers() {
    console.log('invite users');
  }

  render() {
    let that = this;

    // if fantasyLeague info isn't loaded yet, display loading page until it is
    if(!this.state.fantasyLeague) {
      return (
        <LoadingScreen />
      )
    }

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
                <AddUsers inviteUsersFunction={that.inviteUsers.bind(that)} />
              </div>

              <div className="column12 padTopSmall right">
                <button
                  className="btn greenSolidBtn"
                  >
                  Send Invites
                </button>
              </div>
            </div>

            <div className="column3"></div>

        </div>
      </MuiThemeProvider>
    );

  }
}
