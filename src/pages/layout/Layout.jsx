/**
 * General Layout for all display pages.
 */

/* Style Dependencies */
import './Layout.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import Header from './Header';


export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-Layout'>
        <Header />

        <div className='container'>
          {this.props.children}
        </div>

        <div className='footer'>
          <Link to='/privacy-policy'>Privacy Policy</Link>
        </div>
      </div>
    );
  }
}
