/**
 * Functions used to modify user object in store
 */


export function fetchUser() {
  return {
    type: 'FETCH_USER_FULFILLED',
    payload: {
      name: 'Will',
      email: 'test@test.ca'
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
