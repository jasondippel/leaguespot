import { EventEmitter } from "events";
import APIRequest from "../scripts/APIRequest";
import dispatcher from "../dispatcher";

class FantasyLeagueStore extends EventEmitter {

  constructor() {
    super();
  }

  _handleActions(action) {
    switch(action.type) {
      case "FANTASY_LEAGUE_STORE_SET_ACTIVE_FANTASY_LEAGUE":
        this._setActiveFantasyLeague(action.league);
        break;

      default:
        console.log("ERROR: FantasyLeagueStore: Unknown action type", action.type);
    }
  }

  _setActiveFantasyLeague(league) {
    this.fantasyLeague = league;
    this.emit("change");
  }

  getActiveFantasyLeague() {
    if(!this.fantasyLeague) {
      console.log("FantasyLeagueStore::Warning: No fantasy league in store for get request");
    }

    return this.fantasyLeague;
  }

}

const fantasyLeagueStore = new FantasyLeagueStore;
dispatcher.register(fantasyLeagueStore._handleActions.bind(fantasyLeagueStore));

export default fantasyLeagueStore;
