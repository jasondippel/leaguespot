/**
 * General Layout for all display pages.
 */

/* Style Dependencies */
import './Layout.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';


export default class Layout extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='rc-Layout'>
        <header>
          <Link to='/'>
            <div className='logoTitle'>
              LeagueSpot
            </div>
          </Link>
        </header>

        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
