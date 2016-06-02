import React from "react";

export default class LeagueFilters extends React.Component {
  render() {
    return (
      <div className="leagueFilters">

        <div className="filterContainer">
          <div className="filterLabel">
            <label>Sport</label>
          </div>
          <div className="filterObject buttonGroup">
            <button className="btn pair greenOutlineBtn active">All</button>
            <button className="btn pair greenOutlineBtn">Basketball</button>
            <button className="btn pair greenOutlineBtn disabled" disabled>Hockey</button>
            <button className="btn pair greenOutlineBtn disabled" disabled>Soccer</button>
          </div>
        </div>

        <div className="filterContainer">
          <input className="searchBar" placeholder="Enter League Name"></input>
          <div className="filterLabel">
            <label>Privacy</label>
          </div>
          <div className="filterObject buttonGroup">
            <button className="btn pair greenOutlineBtn active">Public</button>
            <button className="btn pair greenOutlineBtn">Private</button>
          </div>
        </div>

        <div className="filterContainer">
          <div className="filterLabel">
            <label>Size</label>
          </div>
          <div className="filterObject buttonGroup">
            <button className="btn pair greenOutlineBtn active">All</button>
            <button className="btn pair greenOutlineBtn">10 & Under</button>
            <button className="btn pair greenOutlineBtn">11-25</button>
            <button className="btn pair greenOutlineBtn">Over 25</button>
          </div>
        </div>

      </div>
    );
  }
}
