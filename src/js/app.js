/**
 * The main app file that gets things started. Contains routing info.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, HashHistory } from "react-router";

// Pages
import Layout from "./pages/Layout";
import About from "./pages/About";
import Registration from "./pages/Registration";
import SignIn from "./pages/SignIn";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={HashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={About}></IndexRoute>
      <Route path="register" name="registration" component={Registration}></Route>
      <Route path="signIn" name="signIn" component={SignIn}></Route>
    </Route>
  </Router>,
app);
