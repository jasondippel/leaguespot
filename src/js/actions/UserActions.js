/*
 * Actions file for UserStore
 *
 */

import dispatcher from "../dispatcher";

export function removeLoggedInUser() {
  dispatcher.dispatch({
    type: "USER_STORE_REMOVE_LOGGED_IN_USER"
  });
}

export function setLoggedInUser(sessionId, user) {
  dispatcher.dispatch({
    type: "USER_STORE_SET_LOGGED_IN_USER",
    sessionId: sessionId,
    user: user
  });
}
