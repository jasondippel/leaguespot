/**
 * This file provides basic javascript functions for retrieving data stored
 * in localStorage. Used primarily for user sessions.
 */

import store from '../pages/store';
import jwtDecode from 'jwt-decode';
import APIRequest from './APIRequest';
let LeagueSpotSessionIdKey = 'LeagueSpot-active-user-session-id';


function setLoggedInUser (sessionId, user) {
  setSessionId(sessionId, user);
  store.dispatch({
    type: 'SET_USER',
    payload: {
      sessionId: sessionId,
      user: user
    }
  });
}

export function removeLoggedInUser() {
  removeSessionId();
  store.dispatch({
    type: 'REMOVE_USER'
  });
}

export function getSessionId () {
 return localStorage.getItem(LeagueSpotSessionIdKey);
}

export function setSessionId (sessionId) {
 localStorage.setItem(LeagueSpotSessionIdKey, sessionId);
}

export function removeSessionId () {
 localStorage.removeItem(LeagueSpotSessionIdKey);
}

export function loggedIn() {
  let sessionId = localStorage.getItem(LeagueSpotSessionIdKey);
  let UserState = store.getState().user;

  if( !sessionId ) {
    return false;
  }
  else if( UserState && UserState.loggedIn ) {
    return true;
  }
  else {
    // TODO: add check for token expiry date

    // If we have the token and it's still valid, we're logged in still. The
    // decoded JWT has all the user info in it, so can just pass that to the
    // store.
    let decodedJWT = jwtDecode(sessionId);
    setLoggedInUser(sessionId, decodedJWT);

    return true;
  }

}
