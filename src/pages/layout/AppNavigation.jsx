/**
 * Header used in Layout. Contains NavBar and logo link
 */

/* Style Dependencies */
import './AppNavigation.less';
import colours from '../../leaguespot-components/constants/colours';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../store';
import { fetchMyFantasyLeagues } from '../../actions/FantasyLeagueActions';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import Icon from '../../leaguespot-components/components/icons/Icon';
import { Sanitize } from '../../utils/Sanitize';


class AppNavigation extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };

    store.subscribe(() => {
      let storeState = store.getState();
      this.setState({
        user: storeState.user.user,
        fantasyLeague: storeState.fantasyLeague
      });
    });
  }

  componentWillMount() {
    this.props.dispatch(fetchMyFantasyLeagues());
    let storeState = store.getState();

    this.setState({
      user: storeState.user.user,
      fantasyLeague: storeState.fantasyLeague
    });
  }

  renderButtons() {
    return (
      <div className='buttons'>
        <Link to='/fantasy-leagues/new-fantasy-league'>
          <span className='icon'>+</span>
          <span className='text'>New League</span>
        </Link>
      </div>
    );
  }

  renderAccountInfo() {
    return (
      <div className='accountInfo'>
        <label className='text'><span className='greeting'>Hi,</span> <span className='userName'>{Sanitize(this.state.user.first_name)}</span></label>
        <div className='accountIcon'>
          <Icon type='account-circle' color={colours.lightTextPrimary} paddingLeft='0.5em' paddingRight='0' />
        </div>
      </div>
    );
  }

  renderFantasyLeagueListItem(fantasyLeague, index) {
    return (
      <Link
        className='fantasyLeagueLink'
        activeClassName="active"
        to={'/fantasy-leagues/' + fantasyLeague.fleague_id}
        key={index}
        >
        <span className='text'>{Sanitize(fantasyLeague.fleague_name)}</span>
      </Link>
    );
  }

  renderFantasyLeagues() {
    let result;

    if (!this.state.fantasyLeague || this.state.fantasyLeague.isLoading) {
      result = (
        <div>
          Loading...
        </div>
      );
    } else if (this.state.fantasyLeague.myFantasyLeagues.length === 0) {
      result = (
        <span className='noLeagues'>No leagues</span>
      );
    } else {
      result = (
        <div>
          {this.state.fantasyLeague.myFantasyLeagues.map(this.renderFantasyLeagueListItem, this)}
        </div>
      );
    }

    return result;
  }

  renderSideNav() {
    let leagueLinks = this.renderFantasyLeagues();

    return (
      <div className='sideNav'>
        <div className='top'>
          <Link className='item' activeClassName="active" to='/dashboard'>
            <div className='icon'>
              <Icon type='dashboard' paddingLeft='0' paddingRight='0.25em'/>
            </div>
            <div className='text'>Dashboard</div>
            <div className='arrow'></div>
          </Link>
          <Link className='item' activeClassName="active" to='/fantasy-leagues'>
            <div className='icon'>
              <Icon type='group' paddingLeft='0' paddingRight='0.25em'/>
            </div>
            <div className='text'>Fantasy Leagues</div>
            <div className='arrow'></div>
          </Link>
          {
            this.props.location.pathname.startsWith('/fantasy-leagues') ? (
              <div className='subNav'>
                { leagueLinks }
              </div>
            ) : ''
          }
          <Link className='item' activeClassName="active" to='/inbox'>
            <div className='icon'>
              <Icon type='chat' paddingLeft='0' paddingRight='0.25em'/>
            </div>
            <div className='text'>Inbox</div>
            <div className='arrow'></div>
          </Link>
        </div>
        <div className='bottom'>
          <Link className='item' activeClassName="active" to='/my-account'>
            <div className='icon'>
              <Icon type='account-circle' paddingLeft='0' paddingRight='0.25em'/>
            </div>
            <div className='text'>My Account</div>
            <div className='arrow'></div>
          </Link>
          <Link className='item signOut' activeClassName="active" to='/sign-out'>
            <div className='icon'>
              <Icon type='arrow-back' paddingLeft='0' paddingRight='0.25em'/>
            </div>
            <div className='text'>Sign Out</div>
            <div className='arrow'></div>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    let buttons = this.renderButtons(),
        accountInfo = this.renderAccountInfo(),
        sideNav = this.renderSideNav();

    return (
      <div className='rc-AppNavigation'>

        <div className='header'>
          <Link to='/'>
            <div className='logoTitle'>
              LeagueSpot
            </div>
          </Link>

          {buttons}
          {accountInfo}
        </div>

        <div className='container'>
          {sideNav}
          <div className='main-content'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(AppNavigation)
