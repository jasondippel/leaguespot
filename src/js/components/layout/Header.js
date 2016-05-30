/**
 * General page header. Appears on all pages as part of the Layout
 *
 */

import React from "react";
import { Link } from "react-router";
import HeaderMenu from "../header/HeaderMenu";
import AccountInfo from "../header/AccountInfo"
import * as auth from "../../scripts/PersistentUser";


export default class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn()
    };
  }

  logout() {
    this.setState({
      loggedIn: false
    });
  }

  render() {
    return (
      <header>
        <Link to="/">
          <div className="logoTitle">
            LeagueSpot<br/>
            <span className="logoSubtext">Fantasy sports, real athletes.</span>
          </div>
        </Link>

        <div className="headerOptions">
          <HeaderMenu />
          <AccountInfo logoutHeader={this.logout.bind(this)}/>
        </div>

      </header>
    );
  }
}
