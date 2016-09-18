import React from 'react';
import { Link } from 'react-router';
import * as auth from '../../utils/PersistentUser';

export default class HeaderMenu extends React.Component {

  constructor() {
    super();

    this.renderButtons = this.renderButtons.bind(this);
  }

  renderButtons() {
    if (auth.loggedIn()) {
      return (
        <nav className='mainNav'>
          <Link to='/lobby' className={this.props.location.pathname == '/lobby' ? 'navLink active' : 'navLink'}>Lobby</Link>
          <Link to='/dashboard' className={this.props.location.pathname == '/dashboard' ? 'navLink active' : 'navLink'}>Dashboard</Link>
          <Link to='/inbox' className={this.props.location.pathname == '/inbox' ? 'navLink active' : 'navLink'}>Inbox</Link>
        </nav>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className='headerMenu'>
        {this.renderButtons}
      </div>
    );
  }
}
