import React from "react";
import UserStore from "../stores/UserStore";

export default class Upcoming extends React.Component {
  render() {
    return (
      <div className="darkContainer">

        <div className="containerBanner">
          <div className="title">User Dashboard</div>
        </div>

        <div className="dashboardContainer">
          <div className="column3">

            <div className="userInfo">
              <div>
                <img className="profileImage square" src="./img/no-profile-image.jpg"></img>
              </div>
              <label className="column12">{UserStore.getFullName()}</label>
            </div>

          </div>

          <div className="column9">
            league stuffs
          </div>

          <div className="column3">
            Upcoming
          </div>

          <div className="column9">
            Sub inbox
          </div>
        </div>


      </div>
    );
  }
}
