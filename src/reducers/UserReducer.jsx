/**
 * Reducer for user object in store
 */

const initialState = {
  user: {
    id: null,
    email: null,
    registration_date: null,
    first_name: null,
    last_name: null,
    country: null,
    state: null,
    city: null
  },
  sessionId: null,
  loggedIn: false
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
      case 'SET_USER': {
        return {
          ...state,
          sessionId: action.payload.sessionId,
          user: action.payload.user,
          loggedIn: true
        }
      }
      case 'REMOVE_USER': {
        return {
          ...state,
          sessionId: initialState.sessionId,
          user: initialState.user,
          loggedIn: initialState.loggedIn
        }
      }
      case 'SET_USER_NAME': {
        return {
          ...state,
          user: {...state.user, name: action.payload.name}
        }
      }
      case 'SET_USER_EMAIL': {
        return {
          ...state,
          user: {...state.user, email: action.payload.email}
        }
      }
    }

    return state
}
