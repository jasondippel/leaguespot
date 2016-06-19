import React from "react";
import APIRequest from "../../scripts/APIRequest";
import Standings from "../../components/fantasyLeague/Standings";
import Roster from "../../components/fantasyLeague/Roster";
import * as auth from "../../scripts/PersistentUser";
import * as activeView from "../../scripts/ActiveView";
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

  render() {
    let that = this;

    // if fantasyLeague info isn't loaded yet, display loading page until it is
    if(!this.state.fantasyLeague) {
      return (
        <LoadingScreen />
      )
    }

    return (
      <div className="darkContainer padBottom">
        <div className="containerBanner">
          <div className="title">Dashboard - { that.state.fantasyLeague.fleague_name }</div>
        </div>

        <div className="column6">
          <div className="componentContainer dark left top">
            <div className="banner">
              <div className="title">League Standings</div>
            </div>

            <Standings leagueId={that.state.fantasyLeague.fleague_id} wide={true}/>
          </div>
        </div>

        <div className="column6">
          <div className="componentContainer dark right top">
            <div className="banner">
              <div className="title">
                Active Roster
              </div>
              <div className="buttons">
                <button className="btn greenSolidBtn">Pick Roster</button>
              </div>
            </div>

            <Roster teamId="12345" type="active" />

          </div>
        </div>

        <div className="column12">
          <div className="componentContainer dark">
            <div className="banner">
              <div className="title">
                Full Roster
              </div>
            </div>

            <Roster teamId="12345" type="full" />

          </div>
        </div>


      </div>
    );
  }
}
