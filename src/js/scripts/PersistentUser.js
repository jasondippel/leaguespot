/**
 * This file provides basic javascript functions for retrieving data stored
 * in localStorage.
 *
 */

import UserStore from "../stores/UserStore";
import * as UserActions from "../actions/UserActions";
import jwtDecode from "jwt-decode";
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
    // If we have the token, we're logged in still (don't have expiry set). The
    // decoded JWT has all the user info in it, so can just pass that to the
    // UserStore.
    let decodedJWT = jwtDecode(sessionId);
    setSessionId(sessionId, decodedJWT);

    UserActions.setLoggedInUser(sessionId, decodedJWT);

    return true;
  }

}
