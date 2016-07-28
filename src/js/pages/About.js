import React from "react";

export default class About extends React.Component {
  render() {
    return (
      <div className="container">

        <div className="coloredHeader">
          <div className="title">
            <p>LeagueSpot</p>
          </div>

          <div className="subtext">
            <p>Fantasy Sports for Real Social Change</p>
          </div>
        </div>

        <div className="secondaryMessage">
          <p>We provide users with the power to setup a fantasy league that focuses on the sport. Users can create fantasy leagues containing multiple professional leagues from the same sport. This will both enriche the users experience while bringing attention to smaller sports leagues.</p>
          <p>Currently in alpha testing.</p>
        </div>

        <div className="column12 padTop">
          <div className="column6 sectionContainer center">
            <div className="sectionTitle padTop">Create your league...</div>
          </div>
          <div className="column6 sectionContainer">
            <img className="aboutImage" src="src/img/creation.png"></img>
          </div>
        </div>

        <div className="column12 padTop">
          <div className="column6 sectionContainer">
            <img className="aboutImage" src="src/img/draft.png"></img>
          </div>
          <div className="column6 sectionContainer center">
            <div className="sectionTitle padTop">Draft your team...</div>
          </div>
        </div>

        <div className="column12 padTop">
          <div className="column6 sectionContainer center">
            <div className="sectionTitle padTop">Compete with friends!</div>
          </div>
          <div className="column6 sectionContainer bigPad">
            <img className="aboutImage" src="src/img/league_dashboard.png"></img>
          </div>
        </div>


      </div>
    );
  }
}
