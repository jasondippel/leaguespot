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
      case "FANTASY_LEAGUE_STORE_LOAD_ACTIVE_FANTASY_LEAGUE":
        // clear old list
        this._clearData();
        // load new list
        this._loadFantasyTeams(action.fleagueId);
        break;

      case "FANTASY_TEAM_STORE_CLEAR_DATA":
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
    this.activeFantasyLeagueId = null;
    this.activeFantasyTeam = null;
    this.fantasyTeams = null;
  }


  /**
   * Add given fantasy team to the fantasy teams list
   *
   * @param {int} fleagueId - id of the fantasy league the team belongs to
   * @param {object} fteam - the fantasy team object to add the the list
   */
  addFantasyTeam(fleagueId, fteam) {
    if(fleagueId === this.activeFantasyLeagueId) {
      this.fantasyTeams.push(fteam);
    } else {
      this.fantasyTeams = [fteam];
    }
    this.emit("change");
  }

  /**
   * Sets the roster of the fantasy teams specified by the given ID to the
   * roster that is passed.
   *
   * @param {int} fteamId - the ID of the fantasy team to add the roster to
   * @param {object} roster - the roster to add to the fantasy team
   */
  addRosterToTeam(fteamId, roster) {
    // add to active team
    if(this.activeFantasyTeam && fteamId === this.activeFantasyTeam.fteam_id) {
      this.activeFantasyTeam.roster = roster;
    }

    // add to teamList team
    let i = 0;
    for(; i < this.fantasyTeams.length; i++) {
      if(this.fantasyTeams[i].fteam_id === fteamId) {
        this.fantasyTeams[i].roster = roster;
      }
    }

    this.emit("change");
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
      apiExt: "/fantasy_leagues/view/" + fleagueId
    }).then((resp) => {
      if (resp.success) {
        that._addTeamsToList(resp.league.fantasy_teams);
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
