import React from "react";
import APIRequestClass from "../../scripts/APIRequest";
import * as auth from "../../scripts/PersistentUser";
import * as activeView from "../../scripts/ActiveView";

const APIRequest = new APIRequestClass();

export default class Dashboard extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container padTop padBottom">
        <h1>Dashboard - { activeView.getActiveViewingLeague() }</h1>
      </div>
    );
  }
}
