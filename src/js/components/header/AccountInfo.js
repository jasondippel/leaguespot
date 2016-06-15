import React from "react";
import { Link } from "react-router";
import APIRequestClass from "../../scripts/APIRequest";
import * as auth from "../../scripts/PersistentUser";

const APIRequest = new APIRequestClass();

export default class HeaderMenu extends React.Component {
  logout() {
    let that = this;

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/logout",
      data: null
    }).then((resp) => {
      if(resp.success) {
        that.props.logout();
      }
      else {
        alert("Failed to loggout: " + resp.responseText);
      }
    }).catch((error) => {
      console.log("Error making request: ", error);
    });
  }

  render() {
    let buttonGroup;

    if (auth.loggedIn()) {
      buttonGroup = (
        <span>
          <label>{auth.getLoggedInUserFirstName()}</label>
          <button className="btn whiteOutlineBtn" onClick={this.logout.bind(this)}>Logout</button>
        </span>
      );
    }
    else {
      buttonGroup = (
        <span>
          <Link to="/register"><button className="btn whiteOutlineBtn">Register</button></Link>
          <Link to="/login"><button className="btn whiteOutlineBtn">Sign In</button></Link>
        </span>
      );
    }

    return (
      <div className="accountInfo">
        {buttonGroup}
      </div>
    );
  }
}
