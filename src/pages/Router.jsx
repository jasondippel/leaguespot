/**
 * Generic Layout used to contain all pages
 */


// Script Dependencies
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

// Pages
import Layout from './layout/Layout';
import AppLayout from './layout/AppLayout';
import Home from './home/Home';
import SignUp from './signUp/SignUp';
import LogIn from './logIn/LogIn';
import Dashboard from './dashboard/Dashboard';


export default (
  <Router history={hashHistory}>
    <Route component={Layout}>
      <Route path='/'>
        <IndexRoute component={Home} />
        <Route path='sign-up' component={SignUp} />
        <Route path='login' component={LogIn} />
      </Route>
    </Route>

    <Route component={AppLayout}>
      <Route path='/dashboard' component={Dashboard} />
    </Route>
  </Router>
);
