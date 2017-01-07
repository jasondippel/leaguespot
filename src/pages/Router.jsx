/**
 * Generic Layout used to contain all pages
 */


// Script Dependencies
import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';

// Pages
import Layout from './layout/Layout';
import AppLayout from './layout/AppLayout';
import Home from './home/Home';
import SignUp from './signUp/SignUp';
import LogIn from './logIn/LogIn';
import Dashboard from './dashboard/Dashboard';
import FantasyLeagues from './fantasyLeagues/FantasyLeagues';
import NewFantasyLeague from './fantasyLeagues/NewFantasyLeague';
import Inbox from './inbox/Inbox';
import MyAccount from './myAccount/MyAccount';
import SignOut from './signOut/SignOut';

// Error Pages
import ErrorPage404 from './errorPages/ErrorPage404';


export default (
  <Router history={hashHistory}>
    <Route component={Layout}>
      <Route path='/'>
        <IndexRoute component={Home} />
        <Route path='sign-up' component={SignUp} />
        <Route path='sign-out' component={SignOut} />
        <Route path='login' component={LogIn} />
      </Route>
    </Route>

    <Route component={AppLayout}>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/fantasy-leagues' component={FantasyLeagues} />
      <Route path='/new-fantasy-league' component={NewFantasyLeague} />
      <Route path='/inbox' component={Inbox} />
      <Route path='/my-account' component={MyAccount} />
    </Route>

    <Route path='/404-page-not-found' component={ErrorPage404} />

    <Redirect from="*" to="/404-page-not-found" />
  </Router>
);
