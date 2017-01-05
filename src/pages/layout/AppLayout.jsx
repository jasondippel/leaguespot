/**
 * General Layout for app pages
 */

/* Style Dependencies */
import './AppLayout.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import Header from './Header';
import AppNavigation from './AppNavigation';


export default class AppLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-AppLayout'>
        <AppNavigation>
          {this.props.children}
        </AppNavigation>
      </div>
    );
  }
}
