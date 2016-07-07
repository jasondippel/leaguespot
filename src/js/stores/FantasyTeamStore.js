import { EventEmitter } from "events";
import APIRequest from "../scripts/APIRequest";
import dispatcher from "../dispatcher";

/*
 * NOTE: any setters/functions that change the store need to emit a change event
 *
 */

class FantasyTeamStore extends EventEmitter {

  constructor() {
    super();

    this.activeFantasyLeagueId = null;
    this.activeFantasyTeam = null;
    this.fantasyTeams = null;
  }


  /**
   * Handles the various actions that occur and involve the FantasyLeagueStore
   *
   * @param {object} action - the action to be performed, includes any extra vars
   */
  _handleActions(action) {
    switch(action.type) {
      case "FANTASY_TEAM_STORE_LOAD_FANTASY_TEAMS":
        // clear old list
        this._clearFantasyTeamsNoEmit();
        // load new list
        this._loadFantasyTeams(action.fleagueId);
        break;

      case "FANTASY_LEAGUE_STORE_LOAD_ACTIVE_FANTASY_LEAGUE":
        // special case: if we load a new active fantasy league, fetch the teams
        //               for that league
        // clear old list
        this._clearFantasyTeamsNoEmit();
        // load new list
        this._loadFantasyTeams(action.fleagueId);
        break;

      default:
        // do nothing
    }
  }


  /**
   * Given a fleagueId, the function loads the fantasy teams for that league
   *
   * @param {int} fleagueId - id corresponding to the fantasy league to load
   *                          teams from
   */
  _loadFantasyTeams(fleagueId) {
    let that = this;

    // case: already have the teams
    if(fleagueId === this.activeFantasyLeagueId) {
      return;
    }

    // case: need to get the teams
    this.activeFantasyLeagueId = fleagueId;
    APIRequest.get({
      api: "LeagueSpot",
      apiExt: "/fantasy_teams/fantasy_leagues/" + fleagueId
    }).then((resp) => {
      if (resp.success) {
        that._addTeamsToList(resp.teams);
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
   * Sets the fantasyTeams list to null
   */
  _clearFantasyTeamsNoEmit() {
    this.fantasyTeams = null;
  }


  /**
   * Sets the fantasyTeams list to teams
   *
   * @param {array} teams - list of fantasy teams in the active league
   */
  _addTeamsToList(teams) {
    this.fantasyTeams = teams;
    this.emit("change");
  }


  /**
   * Returns the list of fantasy teams for the league if loaded, else returns null
   *
   * @param {int} fleagueId - the id of the league to get teams for
   */
  getFantasyTeams(fleagueId) {
    if(fleagueId === this.activeFantasyLeagueId) {
      return this.fantasyTeams;
    } else {
      return null;
    }
  }

}

const fantasyTeamStore = new FantasyTeamStore;
dispatcher.register(fantasyTeamStore._handleActions.bind(fantasyTeamStore));

export default fantasyTeamStore;
