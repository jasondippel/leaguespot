/**
 * Common file used to combine all the reducers for easier import into store.
 */

import { combineReducers } from 'redux';

// Reducers
import UserReducer from './UserReducer';
import FantasyLeagueReducer from './FantasyLeagueReducer';
import MessagesReducer from './MessagesReducer';


export default combineReducers({
  user: UserReducer,
  fantasyLeague: FantasyLeagueReducer,
  messages: MessagesReducer
});
