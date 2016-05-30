/**
 * General page header. Appears on all pages as part of the Layout
 *
 */
import React from "react";
import { Link } from "react-router";
import HeaderMenu from "../header/HeaderMenu";
import AccountInfo from "../header/AccountInfo"


export default class Header extends React.Component {

  render() {
    const { location } = this.props;
    
    return (
      <header>
        <Link to="/">
          <div className="logoTitle">
            LeagueSpot<br/>
            <span className="logoSubtext">Fantasy sports, real athletes.</span>
          </div>
        </Link>

        <div className="headerOptions">
          <HeaderMenu location={location}/>
          <AccountInfo logout={this.props.logout}/>
        </div>

      </header>
    );
  }
}
