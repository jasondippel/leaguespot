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
import { connect } from 'react-redux';
import store from '../store';


class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    };

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched), we will update local component state and force component to rerender with new data.
      this.setState({
        loggedIn: store.getState().user.loggedIn
      });
    });
  }

  componentWillMount() {
    // Get current state from store. Initial render does not have this info yet.
    // Any changes to this information while this component is rendered will be
    // caught by subscription to store above and update this component's state.
    this.setState({
      loggedIn: store.getState().user.loggedIn
    });
  }

  renderAccountInfo() {
    let accountInfo;

    if (this.state.loggedIn) {
      accountInfo = (
        <div>
          <Link to='/sign-out'>
            <FlatButton
              label='Sign Out'
              />
          </Link>
          <Link to='/fantasy-leagues'>
            <RaisedButton
              label='My Fantasy Leagues'
              type='primary'
              />
          </Link>
        </div>
      );
    } else {
      accountInfo = (
        <div>
          <Link to='/login'>
            <FlatButton
              label='Log In'
              />
          </Link>
          <Link to='/sign-up'>
            <RaisedButton
              label='Sign Up'
              type='primary'
              />
          </Link>
        </div>
      );
    }
    return (
      <div className='accountInfo'>
        { accountInfo }
      </div>
    );
  }

  render() {
    let accountInfo = this.renderAccountInfo();

    return (
      <header className='rc-Header'>
        <Link to='/'>
          <div className='logoTitle'>
            LeagueSpot
          </div>
        </Link>

        {accountInfo}

      </header>
    );
  }
}

export default connect(
  (state) => ({})
)(Header)
