import React from "react";

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

        <div className="leagueFilters">

          <div className="filterContainer">
            <div className="filterLabel">
              <label>Sport</label>
            </div>
            <div className="filterObject buttonGroup">
              <button className="btn greenOutlineBtn active">All</button>
              <button className="btn greenOutlineBtn">Basketball</button>
              <button className="btn greenOutlineBtn disabled" disabled>Hockey</button>
              <button className="btn greenOutlineBtn disabled" disabled>Soccer</button>
            </div>
          </div>

          <div className="filterContainer">
            <div className="filterPair">
              <label>Privacy</label>
              <div className="buttonPair">
                <button className="btn greenOutlineBtn active">Public</button>
                <button className="btn greenOutlineBtn">Private</button>
              </div>
            </div>
            <div className="filterPair buttonPair">
              <button className="btn greenOutlineBtn active">All</button>
              <button className="btn greenOutlineBtn">My Leagues</button>
            </div>
          </div>

          <div className="filterContainer">
            <div className="filterLabel">
              <label>Size</label>
            </div>
            <div className="filterObject buttonGroup">
              <button className="btn greenOutlineBtn active">All</button>
              <button className="btn greenOutlineBtn">10 & Under</button>
              <button className="btn greenOutlineBtn">11-25</button>
              <button className="btn greenOutlineBtn">Over 25</button>
            </div>
          </div>

        </div>

        <div className="leagueList">
          League List
        </div>


      </div>
    );
  }
}
