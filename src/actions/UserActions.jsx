/**
 * Functions used to modify user object in store
 */

import * as User from '../utils/PersistentUser';


export function setUser(sessionId, user) {
  User.setSessionId(sessionId);
  return {
    type: 'SET_USER',
    payload: {
      sessionId: sessionId,
      user: user
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name
  }
}

export function setUserEmail(email) {
  return {
    type: 'SET_USER_EMAIL',
    payload: email
  }
}

export function removeUser() {
  User.removeSessionId();
  return {
    type: 'REMOVE_USER'
  }
}
