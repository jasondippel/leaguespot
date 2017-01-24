/**
 * MenuBar component; Meant for use with individual fantasy league page
 *
 */

/* Style Dependencies */
import './MenuBar.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';


export default class MenuBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-MenuBar'>
        <Link to='#'>
          Dashboard
        </Link>
        <Link to='#'>
          My Roster
        </Link>
        <Link to='#'>
          Free Agents
        </Link>
        <Link to='#'>
          Rules & Info
        </Link>
      </div>
    );
  }
}
