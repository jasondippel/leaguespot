/**
 * This file provides basic javascript functions for retrieving data stored
 * in localStorage.
 *
 */

import UserStore from "../stores/UserStore";
import * as UserActions from "../actions/UserActions";
import APIRequest from "./APIRequest";
let LeagueSpotSessionIdKey = "LeagueSpot-active-user-session-id"


export function getSessionId () {
 return localStorage.getItem(LeagueSpotSessionIdKey);
}

export function setSessionId (sessionId, user) {
 localStorage.setItem(LeagueSpotSessionIdKey, sessionId);
 UserActions.setLoggedInUser(sessionId, user);
}

export function removeSessionId () {
 localStorage.removeItem(LeagueSpotSessionIdKey);
 UserActions.removeLoggedInUser();
}

export function loggedIn() {
  let sessionId = localStorage.getItem(LeagueSpotSessionIdKey);

  if( !sessionId ) {
    return false;
  }
  else if( UserStore.getLoggedIn() ) {
    return true;
  }
  else {

    APIRequest.post({
      api: "LeagueSpot",
      apiExt: "/users/reauth",
      data: {
        session_id: sessionId
      }
    }).then((resp) => {
      if (resp.success) {
        setSessionId(resp.sessionId, resp.user);
        return true;
      }
      else {
        removeSessionId();
        return false;
      }
    }).catch((msg) => {
      if(msg.success === false) {
        console.log("User session no longer valid");
      } else {
        console.log("Error: server failed to check if user is currently logged in");
        console.log(msg);
      }

      // Just act like user not logged in
      removeSessionId();
      return false;
    });

  }

}
