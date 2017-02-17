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

  renderMessagesList() {
    return (
      <div className='rc-MessageList'>
        <div className='emptyMessage'>Empty</div>
      </div>
    );
  }

  renderActiveMessage() {
    return (
      <div className='rc-MessageViewer'>
        <div className='emptyMessage'>No message to view</div>
      </div>
    );
  }

  render() {
    let messagesList = this.renderMessagesList();
    let messageViewer = this.renderActiveMessage();

    return (
      <div className='rc-Inbox'>
        <SmallBanner
          title='My Inbox'
          />

        <div className='content'>
          {messagesList}
          {messageViewer}
        </div>
      </div>
    );
  }
}
