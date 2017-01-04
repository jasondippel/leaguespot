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

        <div className='content'>
          Add content here...
        </div>

      </div>
    );
  }
}
