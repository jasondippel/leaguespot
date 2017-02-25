/**
 * Message inbox
 */

/* Style Dependencies */
import './Inbox.less';

/* Script Dependencies */
import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import store from '../store';
import { fetchInboxContents } from '../../actions/MessagesActions';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import SmallBanner from '../../components/banners/SmallBanner';
import { Sanitize } from '../../utils/Sanitize';


class Inbox extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: null,
      activeMessage: 0
    }

    store.subscribe(() => {
      this.setState({
        messages: store.getState().messages
      });
    });

    this.setActiveMessage = this.setActiveMessage.bind(this);
    this.joinInvitedLeague = this.joinInvitedLeague.bind(this);
    this.declineInvitedLeague = this.declineInvitedLeague.bind(this);
  }

  componentWillMount() {
    // fetch inbox contents
    this.props.dispatch(fetchInboxContents());
  }

  setActiveMessage(e) {
    let item = $(e.target.closest('[data-key]'));
    this.setState({
      activeMessage: item.data('key')
    });
  }

  joinInvitedLeague(e) {
    let that = this;
    let index = $(e.target.closest('[data-key]'));
    let fleagueId;

    // call action to join league

    // APIRequest.post({
    //   api: "LeagueSpot",
    //   apiExt: "/fantasy_leagues/join",
    //   data: {
    //     fleague_id: fleagueId
    //   }
    // }).then((resp) => {
    //   if (resp.success) {
    //     if(that.state.messages.length === that.state.selectedIndex + 1) {
    //       let newIndex = that.state.selectedIndex - 1;
    //       if(newIndex < 0) newIndex = 0;
    //       that.setState({
    //         selectedIndex: newIndex
    //       });
    //     }
    //     // remove message from loaded list
    //   }
    //   else {
    //     // TODO: handle better
    //     console.log("Response", resp);
    //     alert("Bad Response");
    //   }
    // }).catch((error) => {
    //   // TODO: handle better
    //   console.log("Error", error);
    //   alert("Error", error);
    // });
  }

  declineInvitedLeague(e) {
    let that = this;
    let index = $(e.target.closest('[data-key]'));
    let fleagueId;

  }

  getMessageCount() {
    let text = '0 messages';

    if (this.state.messages) {
      if (this.state.messages.messages.length === 1) {
        text = this.state.messages.messages.length + ' message'
      } else {
       text = this.state.messages.messages.length + ' messages'
      }
    }

    return text;
  }

  renderMessagesList() {
    let messageList = [];
    let that = this;

    if (this.state.messages) {
      this.state.messages.messages.map((message, index) => {
        let key = index;
        let classes = 'item';
        if (index === this.state.activeMessage) {
          classes += ' active';
        };

        messageList.push((
          <div className={classes} data-key={key} key={key} onClick={that.setActiveMessage}>
            <div className='title'>{Sanitize(message.title)}</div>
            <div className='message'>{Sanitize(message.body)}</div>
          </div>
        ));
      });
    }

    return (
      <div className='rc-MessageList'>
        {messageList}
      </div>
    );
  }

  renderActiveMessage() {
    let messageContent = (
      <div className='emptyMessage'>No messages</div>
    );

    if (this.state.messages) {
      if (this.state.messages.messages.length > 0) {
        let message = this.state.messages.messages[this.state.activeMessage];
        messageContent = (
          <div className='message'>
            <div className='title'>{Sanitize(message.title)}</div>
            <div className='body'>
              <p>{Sanitize(message.body)}</p>
              <p>By clicking join below, you will add this league to your list of leagues and be allowed to view it and add your team. If you do not wish to join this league, simply click decline and you will not see this invitation any more.</p>

              <div className='buttons'>
                <RaisedButton
                  label='Join'
                  type='primary'
                  onClick={this.joinInvitedLeague}
                  />
                <FlatButton
                  label='Decline'
                  onClick={this.declineInvitedLeague}
                  />
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <div className='rc-MessageViewer'>
        {messageContent}
      </div>
    );
  }

  render() {
    let messagesList = this.renderMessagesList();
    let messageViewer = this.renderActiveMessage();
    let messageCount = this.getMessageCount();

    return (
      <div className='rc-Inbox'>
        <SmallBanner
          title='My Inbox'
          subTitle={messageCount}
          />

        <div className='content'>
          {messagesList}
          {messageViewer}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({})
)(Inbox)
