/**
 * Generic Layout used to contain all pages
 */


// Script Dependencies
import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';
import * as auth from '../utils/PersistentUser';
import store from './Store';
import { Provider } from 'react-redux';

// Pages
import Layout from './layout/Layout';
import AppLayout from './layout/AppLayout';
import Home from './home/Home';
import PrivacyPolicy from './privacyPolicy/PrivacyPolicy';
import SignUp from './signUp/SignUp';
import LogIn from './logIn/LogIn';
// import Dashboard from './dashboard/Dashboard'; // TODO: once more info collected, this may be useful
import FantasyLeagues from './fantasyLeagues/FantasyLeagues';
import NewFantasyLeague from './fantasyLeagues/NewFantasyLeague';
import FantasyLeagueDashboard from './fantasyLeagues/fantasyLeague/Dashboard';
import FantasyLeagueStandings from './fantasyLeagues/fantasyLeague/Standings';
import FantasyLeagueRoster from './fantasyLeagues/fantasyLeague/Roster';
import FantasyLeagueInfo from './fantasyLeagues/fantasyLeague/Info';
import Inbox from './inbox/Inbox';
import MyAccount from './myAccount/MyAccount';
import SignOut from './signOut/SignOut';

// Error Pages
import ErrorPage404 from './errorPages/ErrorPage404';


let requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace('/login');
  }
};

let requireNotAuth = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace('/fantasy-leagues');
  }
};

// Used to get user information if a user's session is active. If not, does nothing
let initUser = () => {
  auth.loggedIn();
}

export default (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route onEnter={initUser}>

        <Route component={Layout}>
          <Route path='/'>
            <IndexRoute component={Home} />
            <Route path='privacy-policy' component={PrivacyPolicy} />

            <Route onEnter={requireNotAuth}>
              <Route path='sign-up' component={SignUp} />
              <Route path='login' component={LogIn} />
            </Route>
          </Route>
        </Route>

        <Route component={AppLayout} onEnter={requireAuth}>
          <Route path='/fantasy-leagues' >
            <IndexRoute component={FantasyLeagues} />
            <Route path='/fantasy-leagues/new-fantasy-league' component={NewFantasyLeague} />
            <Route path='/fantasy-leagues/:id' component={FantasyLeagueDashboard}>
              <IndexRoute component={FantasyLeagueStandings} />
              <Route path='/fantasy-leagues/:id/standings' component={FantasyLeagueStandings} />
              <Route path='/fantasy-leagues/:id/roster' component={FantasyLeagueRoster} />
              <Route path='/fantasy-leagues/:id/info' component={FantasyLeagueInfo} />
            </Route>
          </Route>
          <Route path='/inbox' component={Inbox} />
          <Route path='/my-account' component={MyAccount} />
          <Route path='/sign-out' component={SignOut} />
        </Route>

        <Route path='/404-page-not-found' component={ErrorPage404} />

        <Redirect from='*' to='/404-page-not-found' />

      </Route>
    </Router>
  </Provider>
);
