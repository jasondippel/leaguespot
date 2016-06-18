/**
 * General Layout for all pages. Contains Header, Footer, and the container,
 * which is where the more page-specific info will be displayed.
 */

import React from "react";
import UserStore from "../stores/UserStore";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import * as auth from "../scripts/PersistentUser";

export default class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: UserStore.getLoggedIn()
    };
  }

  componentWillMount() {
    UserStore.on("change", this.setLoggedIn.bind(this));
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.setLoggedIn.bind(this));
  }

  setLoggedIn() {
    this.setState({
      loggedIn: UserStore.getLoggedIn()
    });
  }

  logout() {
    auth.removeSessionId();
    this.setState({
      loggedIn: false
    });

    // logout should always take us to signin page
    this.props.history.push("/login");
  }

  login(sessionId, user) {
    auth.setSessionId(sessionId, user);
    this.setState({
      loggedIn: true
    });

    // login should always take us to lobby page
    this.props.history.push("/lobby");
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Header logout={this.logout.bind(this)} login={this.login.bind(this)} location={location}/>

        <div className="container">
          {React.cloneElement(this.props.children, {
            login: this.login.bind(this),
            logout: this.logout.bind(this)
          })}
        </div>

        <Footer/>
      </div>

    );
  }
}
