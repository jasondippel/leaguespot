/**
 * The main app file that gets things started.
 */

 /* Styles */
 import './app.less';

/* Script Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';


const app = document.getElementById('app');
ReactDOM.render( Router, app);
