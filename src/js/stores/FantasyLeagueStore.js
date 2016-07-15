import { EventEmitter } from "events";
import APIRequest from "../scripts/APIRequest";
import dispatcher from "../dispatcher";
import PlayerStore from "./PlayerStore";

/*
 * NOTE: any setters/functions that change the store need to emit a change event
 *
 */

class FantasyLeagueStore extends EventEmitter {

  constructor() {
    super();

    this.fantasyLeagues = {};
    this.myFantasyLeagues = [];
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

      case "FANTASY_LEAGUE_STORE_ADD_FANTASY_LEAGUE_TO_MY_LEAGUES":
        this._addFantasyLeagueToMyLeagues(action.league);
        break;

      case "FANTASY_LEAGUE_STORE_REMOVE_FANTASY_LEAGUE_FROM_MY_LEAGUES_BY_ID":
        this._removeFantasyLeagueFromMyLeagues(action.fleagueId);
        break;

      case "FANTASY_LEAGUE_STORE_REMOVE_FANTASY_LEAGUE_BY_ID":
        this._removeFantasyLeague(action.fleagueId);
        break;

      case "FANTASY_LEAGUE_STORE_SET_ACTIVE_FANTASY_LEAGUE_BY_ID":
        this._setActiveFantasyLeagueById(action.leagueId);
        break;

      case "FANTASY_LEAGUE_STORE_LOAD_MY_FANTASY_LEAGUES":
        this._loadMyFantasyLeagues();
        break;

      case "FANTASY_LEAGUE_STORE_LOAD_ACTIVE_FANTASY_LEAGUE":
        this._loadActiveFantasyLeague(action.fleagueId);
        break;

      case "FANTASY_LEAGUE_STORE_CLEAR_DATA":
        this._clearData();
        break;

      default:
        // do nothing
    }
  }


  /**
   * Clears all the data that is stored in the store. We do not want this to
   * emit a change notification as it may trigger the retrieval of data.
   *
   */
  _clearData() {
    this.fantasyLeagues = {};
    this.myFantasyLeagues = [];
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
   * Adds the given fantasy league to myFantasyLeagues list
   *
   * @param {object} league - fantasy league object
   */
  _addFantasyLeagueToMyLeagues(league) {
    this.myFantasyLeagues.push(league);
    this.emit("change");
  }


  /**
   * Removes the given fantasy league from myFantasyLeagues list
   *
   * @param {int} fleagueId - ID of fantasy league to remove
   */
  _removeFantasyLeagueFromMyLeagues(fleaugeId) {
    // remove fantasy league from this.myFantasyLeagues array
    let i = 0;
    for(; i < this.myFantasyLeagues.length; i++) {
      if(this.myFantasyLeagues[i].fleague_id === fleagueId) {
        this.myFantasyLeagues.splice(i, 1);
        break;
      }
    }

    this.emit("change");
  }


  /**
   * Removes the given fantasy league from all league lists
   *
   * @param {int} fleagueId - ID of fantasy league to remove
   */
  _removeFantasyLeague(fleagueId) {
    // remove fantasy league from this.myFantasyLeagues array
    let i = 0;
    for(; i < this.myFantasyLeagues.length; i++) {
      if(this.myFantasyLeagues[i].fleague_id === fleagueId) {
        this.myFantasyLeagues.splice(i, 1);
        break;
      }
    }

    // remove fantasy league from master list of fantasy leagues
    delete this.fantasyLeagues[fleagueId];

    this.emit("change");
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
    PlayerStore._loadPlayersInLeagues(league.pro_leagues);
  }

  /**
   * Given a league ID, the function sets it as the active league
   *
   * @param {int} leagueId - the ID of the league to set as active leauge
   */
  _setActiveFantasyLeagueById(leagueId) {
    this.activeFantasyLeague = this.fantasyLeagues[leagueId];
    this.emit("change");
    PlayerStore._loadPlayersInLeagues(this.activeFantasyLeague.pro_leagues);
  }


  /**
   * Given an array of fantasy leagues, the function sets them to the list of
   * fantasy leagues for the user
   *
   * @param {array} myFantasyLeagues - array of fantasy leagues the user belongs to
   */
  _setMyFantasyLeagues(myFantasyLeagues) {
    this.myFantasyLeagues = myFantasyLeagues;
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
   * Loads the fantasy leagues a user belongs to and sets this.myFantasyLeagues
   * equal to an array of those leagues
   *
   */
  _loadMyFantasyLeagues(fleagueId) {
    let that = this;

    APIRequest.get({
      api: "LeagueSpot",
      apiExt: "/fantasy_leagues/my_leagues"
    }).then((resp) => {
      if (resp.success) {
        that._addLeaguesToList(resp.leagues);
        that._setMyFantasyLeagues(resp.leagues);
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


  /**
   * Returns the active fantasy league object
   *
   * @return {object} activeFantasyLeague - active fantasy league object
   */
  getActiveFantasyLeague() {
    return this.activeFantasyLeague;
  }


  /**
   * Returns the active fantasy league object
   *
   * @return {array} myFantasyLeagues - array of fantasy leagues the active user
   *                                    belongs to
   */
  getMyFantasyLeagues() {
    return this.myFantasyLeagues;
  }

}

const fantasyLeagueStore = new FantasyLeagueStore;
dispatcher.register(fantasyLeagueStore._handleActions.bind(fantasyLeagueStore));

export default fantasyLeagueStore;
