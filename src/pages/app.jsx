/**
 * The main app file that gets things started.
 */

 /* Styles */
 import './app.less';

/* Script Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

/* The following import and function call is needed to surpress a warning
 * from MaterialUI
 */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const app = document.getElementById('app');
ReactDOM.render( Router, app);
