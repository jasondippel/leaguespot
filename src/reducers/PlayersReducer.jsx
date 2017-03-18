/**
 * Reducer for players object in store
 */

const initialState = {
  players: {},
  loading: false,
  errorMessage: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
      case 'FETCH_PLAYERS': {
        if (state.players[action.payload.league]) {
          // already have players for that league; no need to delay display
          return state;
        }

        return {...state, loading: true}
      }
      case 'FETCH_PLAYERS_REJECTED': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_PLAYERS_ERROR': {
        return {...state, loading: false, errorMessage: action.payload.errorMessage}
      }
      case 'FETCH_PLAYERS_FULFILLED': {
        let newPlayersObj = state.players;
        newPlayersObj[action.payload.league] = action.payload.players;

        return {
          ...state,
          loading: false,
          players: newPlayersObj
        }
      }
    }

    return state
}
