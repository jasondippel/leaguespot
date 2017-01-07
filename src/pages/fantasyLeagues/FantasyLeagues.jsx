/**
 * Summary of fantasy leagues a user belongs to. Can be used as a place to
 * to search for fantasy leagues or create a new one.
 */

/* Style Dependencies */
import './FantasyLeagues.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../components/banners/SmallBanner';


export default class FantasyLeagues extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-FantasyLeagues'>
        <SmallBanner
          title='Fantasy Leagues'
          />

        <div className='content'>
          list of my leagues<br/>
          grey blurb at top to create a new league or select existing one<br/>
        </div>
      </div>
    );
  }
}
