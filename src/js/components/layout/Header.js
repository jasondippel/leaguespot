/**
 * General page header. Appears on all pages as part of the Layout
 *
 * TODO: move the account info stuff into it's own component
 */

import React from "react";
import { Link } from "react-router";


export default class Header extends React.Component {

  render() {
    return (
      <header>

        <Link to="/">
          <div className="logoTitle">
            LeagueSpot<br/>
            <span className="logoSubtext">Fantasy sports, real athletes.</span>
          </div>
        </Link>

        <div className="accountInfo">
          <Link to="/register"><button className="btn whiteOutlineBtn">Register</button></Link>
          <Link to="/login"><button className="btn whiteOutlineBtn">Sign In</button></Link>
        </div>

      </header>
    );
  }
}
