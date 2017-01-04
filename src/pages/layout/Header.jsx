/**
 * Header used in Layout. Contains NavBar and logo link
 */

 /* Style Dependencies */
 import './Header.less';

 /* Script Dependencies */
 import React from 'react';
 import { Link } from 'react-router';


export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className='rc-Header'>
        <Link to='/'>
          <div className='logoTitle'>
            LeagueSpot
          </div>
        </Link>
      </header>
    );
  }
}
