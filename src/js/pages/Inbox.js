import React, {Component, PropTypes} from 'react';
import customTheme from '../../materialUiTheme/CustomTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

import MessagesStore from "../stores/MessagesStore";
import * as MessagesActions from "../actions/MessagesActions";

export default class Inbox extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: MessagesStore.getMessages(),
      selectedIndex: 1,
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
    console.log("messages", messages);
    this.setState({
      messages: messages
    });
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

    // return (
    //   <div className="column12 left">
    //     <SelectableList defaultValue={1} onChangeFunction={this._handleMessageSelection.bind(this)}>
    //       <ListItem
    //         value={1}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //       <ListItem
    //         value={2}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //       <ListItem
    //         value={3}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //       <ListItem
    //         value={4}
    //         primaryText="Invitation to Join Fantasy League"
    //         secondaryText={<div className="brightSecondaryText elipse">Congrats! You've been invited to join this fantasy league</div>}
    //       />
    //     </SelectableList>
    //   </div>
    // );
  }


  getSelectedMessage() {
    if(Object.keys(this.state.messages).length === 0) {
      return(
        <div className="column12 center padTop brightSecondaryText italicize skinny">
          No Message To Display
        </div>
      );
    }
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
    console.log("selected message: " + newIndex);
  }


  render() {
    let that = this;
    let MessageListComponent = this.getMessagesList();
    let MessageDetails = this.getSelectedMessage();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <div className="greyContainer">

            <div className="column3 sideMenu left">
              <div className="column12 mainTitle">
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
