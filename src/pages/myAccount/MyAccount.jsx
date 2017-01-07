/**
 * User account management page
 */

/* Style Dependencies */
import './MyAccount.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../components/banners/SmallBanner';


export default class MyAccount extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-MyAccount'>
        <SmallBanner
          title='My Account'
          />

        <div className='content'>
          edit user info (show summary) <br/>
          upload picture (future) <br/>
          change password <br/>
        </div>
      </div>
    );
  }
}
