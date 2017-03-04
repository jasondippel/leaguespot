/**
 * Reducer for fantasy league object in store
 */

const initialState = {
  messages: [],
  loading: false,
  errorMessage: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
      case 'FETCH_INBOX_CONTENTS': {
        return {...state, loading: true}
      }
      case 'FETCH_INBOX_CONTENTS_REJECTED': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_INBOX_CONTENTS_ERROR': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_INBOX_CONTENTS_FULFILLED': {
        return {
          ...state,
          loading: false,
          messages: action.payload.messages,
        }
      }
      case 'REMOVE_MESSAGE_FROM_INBOX': {
        let messages = state.messages;

        if (action.payload.index > -1 && action.payload.index < messages.length) {
          messages.splice(action.payload.index, 1);
        }
        
        return {
          ...state,
          messages: messages,
        }
      }
    }

    return state
}
