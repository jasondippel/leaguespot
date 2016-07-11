/*
 * Actions file for MessagesStore
 *
 */

import dispatcher from "../dispatcher";

export function loadMessages() {
  dispatcher.dispatch({
    type: "MESSAGES_STORE_LOAD_MESSAGES"
  });
}

export function removeMessage(messageIndex) {
  dispatcher.dispatch({
    type: "MESSAGES_STORE_REMOVE_MESSAGE",
    messageIndex: messageIndex
  });
}

export function clearData() {
  dispatcher.dispatch({
    type: "MESSAGES_STORE_CLEAR_DATA"
  });
}
