/**
 * Header used in Layout. Contains NavBar and logo link
 */

 /* Style Dependencies */
 import './AppNavigation.less';
 import colours from '../../leaguespot-components/constants/colours';

 /* Script Dependencies */
 import React from 'react';
 import { Link } from 'react-router';
 import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
 import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
 import Icon from '../../leaguespot-components/components/icons/Icon';
 // import FlatButton from 'leaguespot-components'; // TODO: figure out why import doesn't work from leaguespot-components module


export default class Header extends React.Component {
  constructor() {
    super();
  }

  renderButtons() {
    return (
      <div className='buttons'>
        <Link>
          <span className='icon'>+</span>
          <span className='text'>New League</span>
        </Link>
      </div>
    );
  }

  renderAccountInfo() {
    return (
      <div className='accountInfo'>
        <label className='text'><span className='greeting'>Hi,</span> <span className='userName'>Jason</span></label>
        <div className='accountIcon'>
          <Icon type='account-circle' color={colours.lightTextPrimary} paddingLeft='0.5em' paddingRight='0' />
        </div>
      </div>
    );
  }

  render() {
    let buttons = this.renderButtons(),
        accountInfo = this.renderAccountInfo();

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
          {this.props.children}
        </div>

      </div>
    );
  }
}
