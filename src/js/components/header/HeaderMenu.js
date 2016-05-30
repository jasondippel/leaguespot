import React from "react";
import { Link } from "react-router";
import * as auth from "../../scripts/PersistentUser";

export default class HeaderMenu extends React.Component {
  render() {
    let buttonGroup;

    if (auth.loggedIn()) {
      buttonGroup = (
        <nav className="mainNav">
          <Link to="/lobby" className={this.props.location.pathname == "/lobby" ? "navLink active" : "navLink"}>Lobby</Link>
          <Link to="/upcoming" className={this.props.location.pathname == "/upcoming" ? "navLink active" : "navLink"}>Upcoming</Link>
          <Link to="/inbox" className={this.props.location.pathname == "/inbox" ? "navLink active" : "navLink"}>Inbox</Link>
        </nav>
      );
    }

    return (
      <div className="headerMenu">
        {buttonGroup}
      </div>
    );
  }
}
