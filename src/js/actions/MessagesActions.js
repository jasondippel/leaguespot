/*
 * Actions file for UserStore
 *
 */

import dispatcher from "../dispatcher";

export function loadMessages() {
  dispatcher.dispatch({
    type: "MESSAGES_STORE_LOAD_MESSAGES"
  });
}
