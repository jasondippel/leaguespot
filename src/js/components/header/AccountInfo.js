import React from "react";
import { Link } from "react-router";
import UserStore from "../../stores/UserStore";
import APIRequest from "../../scripts/APIRequest";
import * as auth from "../../scripts/PersistentUser";

export default class HeaderMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      userFirstName: UserStore.getFirstName()
    }
  }

  componentWillMount() {
    UserStore.on("change", this.setUserFirstName.bind(this));
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.setUserFirstName.bind(this));
  }

  setUserFirstName() {
    this.setState({
      userFirstName: UserStore.getFirstName()
    });
  }

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
          <label>{this.state.userFirstName}</label>
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
