import React from "react";
import { Link } from "react-router";
import * as auth from "../../scripts/PersistentUser";

export default class HeaderMenu extends React.Component {
  render() {
    let buttonGroup;

    if (auth.loggedIn()) {
      buttonGroup = (
        <span>
          <Link to="/lobby"><button className="btn whiteOutlineBtn">Lobby</button></Link>
          <Link to="/notifications"><button className="btn whiteOutlineBtn">Upcoming</button></Link>
        </span>
      );
    }

    return (
      <div className="headerMenu">
        {buttonGroup}
      </div>
    );
  }
}
