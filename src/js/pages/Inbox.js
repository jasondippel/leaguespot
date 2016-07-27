import React, {Component, PropTypes} from 'react';
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

import APIRequest from "../scripts/APIRequest";

import MessagesStore from "../stores/MessagesStore";
import UserStore from "../stores/UserStore";
import * as MessagesActions from "../actions/MessagesActions";

export default class Inbox extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: MessagesStore.getMessages(),
      selectedIndex: 0,
      activeMessageId: null // TODO: keep track of which message is displayed via ID
                            // so it works when updating message list
    }
  }


  componentWillMount() {
    MessagesStore.on("change", this.setMessages.bind(this));
  }


  componentDidMount() {
    if(!this.state.messages || this.state.messages.length === 0) {
      MessagesActions.loadMessages();
    }
  }


  componentWillUnmount() {
    MessagesStore.removeListener("change", this.setMessages.bind(this));
  }


  setMessages() {
    let messages = MessagesStore.getMessages();
    this.setState({
      messages: messages
    });
  }


  createInviteMessageShort(message, value) {
    return (
      <ListItem
        value={value}
        primaryText="Invitation to Join Fantasy League"
        secondaryText = {
          <div className="brightSecondaryText elipse">
            Congrats! You've been invited to join {message.league.fleague_name}!
          </div>
        }
        style={{borderBottom: '1px solid #555'}}
        disabled={true}
      />
    );
  }


  createInviteMessageFull(message, messageIndex) {
    return (
      <div className="column12 padSides">

        <div className="column12 leagueBanner" style={{paddingLeft: 0}}>
          <div className="column8">
            <span className="title">Invitation to Join Fantasy League</span>
          </div>
        </div>

        <div className="column12 skinny">
          <p>Congrats! You've been invited to join <b>{message.league.fleague_name}</b>!</p>
          <p>By clicking join below, you will add this league to your list of leagues and be allowed to view it and add your team. If you do not wish to join this league, simply click decline and you will not see this invitation any more. </p>
        </div>

        <div className="column12">
          <div className="column3"></div>
          <div className="column3 center">
            <button
              className="btn simpleGreenBtn brightBackground"
              onClick={this.joinInvitedLeague.bind(this)}
              data-messageIndex={this.state.selectedIndex}
              data-fleagueId={message.league.fleague_id} >
              Join
            </button>
          </div>
          <div className="column3 center">
            <button
              className="btn simpleGreyBtn brightBackground"
              onClick={this.declineInvitedLeague.bind(this)}
              data-messageIndex={this.state.selectedIndex}
              data-fleagueId={message.league.fleague_id}
              data-email={UserStore.getEmail()} >
              Decline
            </button>
          </div>
          <div className="column3"></div>
        </div>

      </div>
    );
  }


  getMessagesList() {
    let SelectableList = MakeSelectable(List);
    SelectableList = this.wrapState(SelectableList);

    if(Object.keys(this.state.messages).length === 0) {
      return(
        <div className="column12 center brightSecondaryText padTopSmall italicize skinny">
          Empty
        </div>
      );
    }

    let messageList = [];
    let that = this;
    this.state.messages.map(function(message, index) {
      let messageComponent;
      switch (message.messageType) {
        case "fleagueInvite":
          messageComponent = that.createInviteMessageShort(message, index);
          break;

        default:
          messageComponent = "";
      }

      messageList.push(messageComponent);
    });

    return (
      <div className="column12 left">
        <SelectableList
          defaultValue={this.state.selectedIndex}
          onChangeFunction={this._handleMessageSelection.bind(this)} >
          {messageList}
        </SelectableList>
      </div>
    )

  }


  getSelectedMessage() {
    if(Object.keys(this.state.messages).length === 0) {
      return(
        <div className="column12 center padTop brightSecondaryText italicize skinny">
          No Message To Display
        </div>
      );
    }

    let activeMessage = this.state.messages[this.state.selectedIndex];
    let messageComponent;

    switch (activeMessage.messageType) {
      case "fleagueInvite":
        messageComponent = this.createInviteMessageFull(activeMessage);
        break;

      default:
        messageComponent = "";
    }

    return messageComponent;
  }


  // function for SelectableList
  wrapState(ComposedComponent) {
    return class SelectableList extends Component {
      static propTypes = {
        children: PropTypes.node.isRequired,
        defaultValue: PropTypes.number.isRequired,
        onChangeFunction: PropTypes.func.isRequired
      };

      componentWillMount() {
        this.setState({
          selectedIndex: this.props.defaultValue,
        });
      }

      handleRequestChange = (event, index) => {
        this.props.onChangeFunction(index);
        this.setState({
          selectedIndex: index,
        });
      };

      render() {
        return (
          <ComposedComponent
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
            {this.props.children}
          </ComposedComponent>
        );
      }
    };
  }


  _handleMessageSelection(newIndex) {
    this.setState({
      selectedIndex: newIndex
    });
  }


  joinInvitedLeague(event) {
    let that = this;
    let fleagueId = event.target.dataset.fleagueid;
    let messageIndex = event.target.dataset.messageindex;

    console.log("event", event);
    console.log("fleague_id", fleagueId);

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/join",
      data: {
        fleague_id: fleagueId
      }
    }).then((resp) => {
      if (resp.success) {
        if(that.state.messages.length === that.state.selectedIndex + 1) {
          let newIndex = that.state.selectedIndex - 1;
          if(newIndex < 0) newIndex = 0;
          that.setState({
            selectedIndex: newIndex
          });
        }
        MessagesActions.removeMessage(messageIndex);
      }
      else {
        // TODO: handle better
        console.log("Response", resp);
        alert("Bad Response");
      }
    }).catch((error) => {
      // TODO: handle better
      console.log("Error", error);
      alert("Error", error);
    });
  }


  declineInvitedLeague(event) {
    let that = this;
    let fleagueId = event.target.dataset.fleagueid;
    let messageIndex = event.target.dataset.messageindex;
    let invitedEmail = event.target.dataset.email;

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/uninvite",
      data: {
        fleague_id: fleagueId,
        email: invitedEmail
      }
    }).then((resp) => {
      if (resp.success) {
        if(that.state.messages.length === that.state.selectedIndex + 1) {
          let newIndex = that.state.selectedIndex - 1;
          if(newIndex < 0) newIndex = 0;
          that.setState({
            selectedIndex: newIndex
          });
        }
        MessagesActions.removeMessage(messageIndex);
      }
      else {
        // TODO: handle better
        console.log("Response", resp);
        alert("Bad Response");
      }
    }).catch((error) => {
      // TODO: handle better
      console.log("Error", error);
      alert("Error", error);
    });
  }


  render() {
    let that = this;
    let MessageListComponent = this.getMessagesList();
    let MessageDetails = this.getSelectedMessage();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="greyContainer" style={{paddingTop: 0}}>

            <div className="column3 sideMenu left" style={{paddingTop: 0}}>
              <div className="column12 mainTitle" style={{backgroundColor: '#49b64d', paddingTop: '1em', borderBottom: '1px solid #FFF'}}>
                Inbox
              </div>
              {MessageListComponent}
            </div>

            <div className="column9 darkContainer">
              {MessageDetails}
            </div>

        </div>
      </MuiThemeProvider>

    );
  }
}
