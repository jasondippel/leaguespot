import React from "react";
import { Link } from "react-router";
import customTheme from '../../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import APIRequest from "../../scripts/APIRequest";
// import Standings from "../../components/fantasyLeague/Standings";
// import Roster from "../../components/fantasyLeague/Roster";
import * as auth from "../../scripts/PersistentUser";
import FantasyLeagueStore from "../../stores/FantasyLeagueStore";
import * as FantasyLeagueActions from "../../actions/FantasyLeagueActions";
import LoadingScreen from "../LoadingScreen";

export default class Dashboard extends React.Component {
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

  _goToDraftTeam() {
    let leagueId = this.props.params.fleagueId;
    this.props.history.push("/fantasyLeague/" + leagueId + "/draft");
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

            <div className="column10">
              <div className="column12 leagueBanner">
                <span className="title">{that.state.fantasyLeague.fleague_name}</span><br/>
                <span className="subtext below small">Fantasy League</span>
              </div>
            </div>

        </div>
      </MuiThemeProvider>
    );

  }
}
