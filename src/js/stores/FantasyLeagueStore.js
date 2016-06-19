import { EventEmitter } from "events";
import APIRequest from "../scripts/APIRequest";
import dispatcher from "../dispatcher";

/*
 * NOTE: any setters/functions that change the store need to emit a change event
 *
 */

class FantasyLeagueStore extends EventEmitter {

  constructor() {
    super();

    this.fantasyLeagues = {};
  }


  /**
   * Handles the various actions that occur and involve the FantasyLeagueStore
   *
   * @param {object} action - the action to be performed, includes any extra vars
   */
  _handleActions(action) {
    switch(action.type) {
      case "FANTASY_LEAGUE_STORE_SET_ACTIVE_FANTASY_LEAGUE":
        this._setActiveFantasyLeague(action.league);
        break;

      case "FANTASY_LEAGUE_STORE_LOAD_ACTIVE_FANTASY_LEAGUE":
        this._loadActiveFantasyLeague(action.fleagueId);
        break;

      default:
        // console.log("ERROR: FantasyLeagueStore: Unknown action type", action.type);
    }
  }

  /**
   * Adds given leagues to the list of stored leagues
   *
   * @param {array} leagues - array to leagues to add
   */
  _addLeaguesToList(leagues) {
    let i;
    for(i = 0; i<leagues.length; i++) {
      this.fantasyLeagues[leagues[i].fleague_id] = leagues[i];
    }
  }


  /**
   * Given a league, the function sets it as the active league and adds it to
   * the list.
   *
   * @param {object} league - the leauge object to add/set as active leauge
   */
  _setActiveFantasyLeague(league) {
    this.activeFantasyLeague = league;
    this.fantasyLeagues[league.fleague_id] = league;
    this.emit("change");
  }


  /**
   * Given a fleagueId, the function loads the league into the list of leagues
   * and sets it as active.
   *
   * @param {int} fleagueId - id corresponding to the fantasy league to load
   */
  _loadActiveFantasyLeague(fleagueId) {
    if(this.fantasyLeagues[fleagueId]) {
      this._setActiveFantasyLeague(this.fantasyLeagues[fleagueId]);
    } else {
      let that = this;

      // make request to server to get league by Id

      // TODO: change this to use endpoint that fetches specific league info
      APIRequest.get({
        api: "LeagueSpot",
        apiExt: "/fantasy_leagues/my_leagues"
      }).then((resp) => {
        if (resp.success) {
          that._addLeaguesToList(resp.leagues);
          that._setActiveFantasyLeague(that.fantasyLeagues[fleagueId]);
        }
        else {
          // TODO: handle better
          console.log("Response", resp);
          alert("Bad Response");
        }
      }).catch((error) => {
        // TODO: handle better
        console.log("Error", error);
        alert("Error", error);
      });
    }
  }


  /**
   * Returns the active fantasy league object
   *
   * @return {object} activeFantasyLeague - active fantasy league object
   */
  getActiveFantasyLeague() {
    if(!this.activeFantasyLeague) {
      console.log("FantasyLeagueStore::Warning: No fantasy league in store for get request");
    }

    return this.activeFantasyLeague;
  }

}

const fantasyLeagueStore = new FantasyLeagueStore;
dispatcher.register(fantasyLeagueStore._handleActions.bind(fantasyLeagueStore));

export default fantasyLeagueStore;
