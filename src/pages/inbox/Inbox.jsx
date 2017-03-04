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
import { fetchInboxContents, removeMessage } from '../../actions/MessagesActions';
import FlatButton from '../../leaguespot-components/components/buttons/FlatButton';
import RaisedButton from '../../leaguespot-components/components/buttons/RaisedButton';
import Toast from '../../leaguespot-components/components/toast/Toast';
import SmallBanner from '../../components/banners/SmallBanner';
import { Sanitize } from '../../utils/Sanitize';
import APIRequest from '../../utils/APIRequest';


class Inbox extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: null,
      activeMessageIndex: 0,
      toastOpen: false,
      toastMessage: '',
      toastType: 'DEFAULT',
      toastOnClose: () => {},
    }

    store.subscribe(() => {
      this.setState({
        messages: store.getState().messages,
        user: store.getState().user.user
      });
    });

    this.setActiveMessageIndex = this.setActiveMessageIndex.bind(this);
    this.joinInvitedLeague = this.joinInvitedLeague.bind(this);
    this.declineInvitedLeague = this.declineInvitedLeague.bind(this);
    this.handleOpenToast = this.handleOpenToast.bind(this);
    this.handleCloseToast = this.handleCloseToast.bind(this);
  }

  componentWillMount() {
    // fetch inbox contents
    this.props.dispatch(fetchInboxContents());
  }

  setActiveMessageIndex(e) {
    let item = $(e.target.closest('[data-key]'));
    this.setState({
      activeMessageIndex: item.data('key')
    });
  }

  handleOpenToast(type, message) {
    this.setState({
      toastOpen: true,
      toastType: type,
      toastMessage: message,
      toastOnClose: this.handleCloseToast
    });
  }

  handleCloseToast() {
    this.setState({
      toastOpen: false
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
    let index = this.state.activeMessageIndex;
    let message = this.state.messages.messages[index];
    let numMessages = this.state.messages.messages.length;
    let fleagueId = message.fleagueId;
    let uninviteEmail = this.state.user.email;

    // make call to backend
    let that = this;
    APIRequest.post({
      api: 'LeagueSpot',
      apiExt: '/fantasy_leagues/uninvite',
      data: {
        fleague_id: fleagueId,
        email: uninviteEmail
      }
    })
    .then((resp) => {
      if (resp.success) {
        // remove message from store
        that.props.dispatch(removeMessage(index));

        // update active index
        if (index === numMessages - 1 && index > 0) {
          index--;
        }

        that.setState({
          activeMessageIndex: index
        });

        that.handleOpenToast('default', 'Invitation has been declined');

      } else {
        that.handleOpenToast('error', 'Failed to decline invitation, try again later');
        console.error('Failed to decline invitation', resp.message);
      }
    })
    .catch((error) => {
      that.handleOpenToast('error', 'Error updating user information');
      console.error('Error declining invitation', error);
    });

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
        if (index === this.state.activeMessageIndex) {
          classes += ' active';
        };

        messageList.push((
          <div className={classes} data-key={key} key={key} onClick={that.setActiveMessageIndex}>
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
        let message = this.state.messages.messages[this.state.activeMessageIndex];
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
