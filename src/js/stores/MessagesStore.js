import { EventEmitter } from "events";
import APIRequest from "../scripts/APIRequest";
import * as auth from "../scripts/PersistentUser";
import dispatcher from "../dispatcher";

class MessagesStore extends EventEmitter {

  constructor() {
    super();

    this.messages = [];
  }

  _handleActions(action) {
    switch(action.type) {
      case "MESSAGES_STORE_LOAD_MESSAGES":
        this._loadMessages();
        break;

      case "MESSAGES_STORE_CLEAR_DATA":
        this._clearData();
        break;

      default:
        // do nothing
    }
  }


  /**
   * Clears all the data that is stored in the store. We do not want this to
   * emit a change notification as it may trigger the retrieval of data.
   *
   */
  _clearData() {
    this.messages = [];
  }


  /**
   * Given a list of messages, this function adds them to the master list of
   * messages.
   *
   * @param {array} messages - an array of messages
   */
   _addMessages(messages) {
     this.messages = messages;
     this.emit("change");
   }


  /**
   * Given a list of invited leagues, this function creates a list of invite
   * messages and pushes them onto the messages list
   *
   * @param {associative array} invitedLeages - list of leagues the user is
   *                                            invited to
   */
  _generateInviteMessages(invitedLeages) {
    let messages = [];

    // generate messages
    invitedLeagues.map(function(league) {
      let newMessage = {};
      newMessage["messageType"] = "fleagueInvite";
      newMessage["league"] = league;
      messages.push(newMessage);
    });

    return messages;
  }


  /**
   * Makes a call to the API to get the messages for a user
   *
   */
  _loadMessages() {
    let that = this;

    // APIRequest.get({
    //   api: "LeagueSpot",
    //   apiExt: "/fantasy_leagues/my_invited_leagues"
    // }).then((resp) => {
    //   if (resp.success) {
    //     let inviteMessages = that._generateInviteMessages(resp.leagues);
    //     this._addMessages(inviteMessages);
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


  /**
   * Returns the list of messages
   *
   */
  getMessages() {
    return this.messages;
  }

}

const messagesStore = new MessagesStore;
dispatcher.register(messagesStore._handleActions.bind(messagesStore));

export default messagesStore;
