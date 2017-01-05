/**
 * Header used in Layout. Contains NavBar and logo link
 */

 /* Style Dependencies */
 import './Header.less';

 /* Script Dependencies */
 import React from 'react';
 import { Link } from 'react-router';
 import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
 import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
 // import FlatButton from 'leaguespot-components'; // TODO: figure out why import doesn't work from leaguespot-components module


export default class Header extends React.Component {
  constructor() {
    super();
  }

  renderButtons() {
    return (
      <div className='buttons'>
        <Link to='/dashboard'>
          Dashboard
        </Link>
        <Link>
          Inbox
        </Link>
      </div>
    );
  }

  renderAccountInfo() {
    return (
      <div className='accountInfo'>
        <Link to="/login">
          <FlatButton
            label='Log In'
            />
        </Link>
        <Link to="/sign-up">
          <RaisedButton
            label='Sign Up'
            type='primary'
            />
        </Link>
      </div>
    );
  }

  render() {
    let buttons = this.renderButtons(),
        accountInfo = this.renderAccountInfo();

    return (
      <header className='rc-Header'>
        <Link to='/'>
          <div className='logoTitle'>
            LeagueSpot
          </div>
        </Link>

        {buttons}
        {accountInfo}

      </header>
    );
  }
}
