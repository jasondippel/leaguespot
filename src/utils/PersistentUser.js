/**
 * This file provides basic javascript functions for retrieving data stored
 * in localStorage.
 *
 */

import Store from '../pages/Store';
import jwtDecode from 'jwt-decode';
import APIRequest from './APIRequest';
let LeagueSpotSessionIdKey = 'LeagueSpot-active-user-session-id';


function setLoggerInUser (sessionId, user) {
  setSessionId(sessionId, decodedJWT);
  Store.dispatch({
    type: 'SET_USER',
    sessionId: sessionId,
    user: user
  });
}

function removeLoggedInUser() {
  removeSessionId();
  Store.dispatch({
    type: 'REMOVE_USER'
  });
}

export function getSessionId () {
 return localStorage.getItem(LeagueSpotSessionIdKey);
}

export function setSessionId (sessionId, user) {
 localStorage.setItem(LeagueSpotSessionIdKey, sessionId);
}

export function removeSessionId () {
 localStorage.removeItem(LeagueSpotSessionIdKey);
}

export function loggedIn() {
  let sessionId = localStorage.getItem(LeagueSpotSessionIdKey);

  console.log('jason test', Store);

  if( !sessionId ) {
    return false;
  }
  // else if( UserStore.getLoggedIn() ) {
  //   return true;
  // }
  else {
    // If we have the token, we're logged in still (don't have expiry set). The
    // decoded JWT has all the user info in it, so can just pass that to the
    // UserStore.
    let decodedJWT = jwtDecode(sessionId);
    setLoggedInUser(sessionId, decodedJWT);

    return true;
  }

}
