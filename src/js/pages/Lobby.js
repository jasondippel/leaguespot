import React from "react";
import { Link } from "react-router";
import LeagueList from "../components/lobby/LeagueList";
import LeagueFilters from "../components/lobby/LeagueFilters";

export default class Lobby extends React.Component {
  render() {
    return (
      <div className="darkContainer">

        <div className="containerBanner">
          <div className="title">Lobby</div>

          <div className="buttons">
            <Link to="/createLeague"><button className="btn greenSolidBtn">Create League</button></Link>
          </div>
        </div>

        <div className="column12">
          <div className="column3"></div>

          <div className="column6 standardContainer grey">
            <div>
              <h3>We're sorry...</h3>
              <p>This feature is not available in the <b>alpha version</b>. The ability to search through and join public leagues will be added soon.</p>
              <p>In the mean time, you can click the create button above to start your own private fantasy league. Invite your friends and let the competition begin!</p>
            </div>
          </div>

          <div className="column3"></div>
        </div>

      </div>
    );
  }
}
