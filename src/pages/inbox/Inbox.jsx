/**
 * Message inbox
 */

/* Style Dependencies */
import './Inbox.less';

/* Script Dependencies */
import React from 'react';
import { Link } from 'react-router';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../components/banners/SmallBanner';


export default class Inbox extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='rc-Inbox'>
        <SmallBanner
          title='My Inbox'
          />

        <div className='content'>
          messages with filter bar (future)
        </div>
      </div>
    );
  }
}
