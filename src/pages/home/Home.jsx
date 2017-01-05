/**
 * Welcome/About standard page
 */

 /* Style Dependencies */
 import './Home.less';

 /* Script Dependencies */
 import React from 'react';

export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="rc-Home">

        <div className='banner'>
          <div className="title">
            LeagueSpot
          </div>
          <div className="subText">
            Fantasy Sports for Real Social Change
          </div>
        </div>

        <div className='infoBanner'>
          We provide users with the power to setup a fantasy league that focuses on the sport. Users can create fantasy leagues containing multiple professional leagues from the same sport. This will both enriche the users experience while bringing attention to smaller sports leagues.
        </div>

        <div className='content'>
          Add content here...
        </div>

      </div>
    );
  }
}
