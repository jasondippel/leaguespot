/**
 * Generic Layout used to contain all pages
 */


// Script Dependencies
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

// Pages
import Layout from './layout/Layout';
import Home from './home/Home';


export default (
  <Router history={hashHistory}>
    <Route component={Layout}>

      <Route path='/'>
        <IndexRoute path='' component={Home} />
      </Route>

    </Route>
  </Router>
);
