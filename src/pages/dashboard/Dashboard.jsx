/**
 * Dashboard used as the homepage once a user access the app. Should be a
 * summary of what the user has going on.
 */

/* Style Dependencies */
import './Dashboard.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../components/banners/SmallBanner';


export default class Dashboard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-Dashboard'>
        <SmallBanner
          title='My Dashboard'
          />

        <div className='content'>
          unread messages<br/>
          my fleagues and current position within league <br/>
        </div>
      </div>
    );
  }
}
