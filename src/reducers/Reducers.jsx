/**
 * Common file used to combine all the reducers for easier import into store.
 */

import { combineReducers } from 'redux';

// Reducers
import User from './UserReducer';


export default combineReducers({
  User
});
