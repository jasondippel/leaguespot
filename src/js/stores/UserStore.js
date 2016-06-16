import { EventEmitter } from "events";
import * as auth from "../scripts/PersistentUser";
import APIRequest from "../scripts/APIRequest";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {

  constructor() {
    super();

    this.sessionId = auth.getSessionId();
    this.loggedIn = null;
    this.user = null;
  }

  _handleActions(action) {
    switch(action.type) {
      case "USER_STORE_SET_LOGGED_IN_USER":
        this._setLoggedInUser(action.sessionId, action.user);
        break;

      case "USER_STORE_REMOVE_LOGGED_IN_USER":
        this._removeLoggedInUser();
        break;

      default:
        console.log("ERROR: UserStore: Unknown action type", action.type);
    }
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  getFirstName() {
    return this.user.first_name;
  }

  getEmail() {
    return this.user.email;
  }

  getFullName() {
    return this.user.first_name + " " + this.user.last_name;
  }

  _setLoggedInUser(sessionId, user) {
    this.loggedIn = true;
    this.sessionId = sessionId;
    this.user = user;

    this.emit("change");
  }

  _removeLoggedInUser() {
    this.loggedIn = false;
    this.sessionId = null;
    this.user = null;

    this.emit("change");
  }

}

const userStore = new UserStore;
dispatcher.register(userStore._handleActions.bind(userStore));

export default userStore;
