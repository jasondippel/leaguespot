/**
 * Functions used to modify user object in store
 */
 import * as User from '../utils/PersistentUser';


export function fetchUser() {
  return {
    type: 'FETCH_USER_FULFILLED',
    payload: {
      name: 'Will',
      email: 'test@test.ca'
    }
  }
}

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

export function removeUser() {
  return {
    type: 'REMOVE_USER'
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
