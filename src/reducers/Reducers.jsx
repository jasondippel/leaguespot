/**
 * Common file used to combine all the reducers for easier import into store.
 */

import { combineReducers } from 'redux';

// Reducers
import UserReducer from './UserReducer';


export default combineReducers({
  user: UserReducer
});
