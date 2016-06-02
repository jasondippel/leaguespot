import React from "react";
import LeagueList from "../components/lobby/LeagueList";
import LeagueFilters from "../components/lobby/LeagueFilters";

export default class Lobby extends React.Component {
  render() {
    return (
      <div className="darkContainer">

        <div className="lobbyBanner">
          <div className="title">Lobby</div>

          <div className="buttons">
            <button className="btn greenSolidBtn">Create League</button>
          </div>
        </div>

        <LeagueFilters />

        <LeagueList />

      </div>
    );
  }
}
