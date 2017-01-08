/**
 * The main app file that gets things started.
 */

 /* Styles */
 import './app.less';

/* Script Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './Router';

/* Store */
import Store from './Store';


const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    { Router }
  </Provider>
, app);
