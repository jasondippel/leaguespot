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
  loggedIn: false,
  fetching: false,
  fetched: false,
  error: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
      // case 'FETCH_USER': {
      //   return {...state, fetching: true}
      // }
      // case 'FETCH_USER_REJECTED': {
      //   return {...state, fetching: false, error: action.payload}
      // }
      // case 'FETCH_USER_FULFILLED': {
      //   return {
      //     ...state,
      //     fetching: false,
      //     fetched: true,
      //     user: action.payload,
      //   }
      // }
      case 'SET_USER': {
        console.log('jason test');
        return {
          ...state,
          sessionId: action.payload.sessionId,
          user: action.payload.user
        }
      }
      case 'REMOVE_USER': {
        return {
          ...state,
          sessionId: initialState.sessionId,
          user: initialState.user
        }
      }
      case 'SET_USER_NAME': {
        return {
          ...state,
          user: {...state.user, name: action.payload}
        }
      }
      case 'SET_USER_EMAIL': {
        return {
          ...state,
          user: {...state.user, email: action.payload}
        }
      }
    }

    return state
}
