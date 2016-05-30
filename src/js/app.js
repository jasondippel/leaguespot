/**
 * The main app file that gets things started. Contains routing info.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, HashHistory } from "react-router";

// Helper Scripts
import * as auth from "./scripts/PersistentUser";

// Pages
import Layout from "./pages/Layout";
import About from "./pages/About";
import Registration from "./pages/Registration";
import SignIn from "./pages/SignIn";
import Lobby from "./pages/Lobby";
import Upcoming from "./pages/Upcoming";
import Inbox from "./pages/Inbox";

const app = document.getElementById('app');

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query);
  }
}

function requireNotAuth(nextState, replace) {
  if (auth.loggedIn()) {
    replace({ nextPathname: nextState.location.pathname }, '/lobby', nextState.location.query);
  }
}


ReactDOM.render(
  <Router history={HashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={About}></IndexRoute>

      <Route path="/register" name="registration" component={Registration} onEnter={requireNotAuth}></Route>
      <Route path="/login" name="login" component={SignIn} onEnter={requireNotAuth}></Route>

      <Route path="/lobby" name="lobby" component={Lobby}  onEnter={requireAuth}></Route>
      <Route path="/upcoming" name="upcoming" component={Upcoming}  onEnter={requireAuth}></Route>
      <Route path="/inbox" name="inbox" component={Inbox}  onEnter={requireAuth}></Route>
    </Route>
  </Router>,
app);
