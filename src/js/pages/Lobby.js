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
          This page is under construction. It will list public fantasy leagues and allow you to join them if there's room left.
        </div>

      </div>
    );
  }
}
