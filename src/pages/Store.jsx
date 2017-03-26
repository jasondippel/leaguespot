import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import Reducer from '../reducers/Reducers';

let middleware;

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(promise(), thunk);
} else {
  middleware = applyMiddleware(promise(), thunk, logger());
}

export default createStore(Reducer, middleware);
