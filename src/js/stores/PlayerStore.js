import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import APIRequest from "../scripts/APIRequest";

class PlayerStore extends EventEmitter {

  constructor() {
    super();

    this.players = {};
  }


  /**
   * Handles the various actions that occur and involve the store
   *
   * @param {object} action - the action to be performed, includes any extra vars
   */
  _handleActions(action) {
    switch(action.type) {
      case "PLAYER_STORE_LOAD_PLAYERS_IN_LEAGUES":
        this._loadPlayersInLeagues(action.leagueIds);
        break;

      case "PLAYER_STORE_LOAD_PLAYERS_IN_LEAGUE":
        this._loadPlayersInLeague(action.leagueId);
        break;

      case "PLAYER_STORE_CLEAR_DATA":
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
    this.players = {};
  }


  /**
   * Given a complete list of the players in the league, the function replaces
   * the existing list with the one given
   *
   * @param {int} leagueId - id of the league the list of players belong to
   * @param {array} playersList - the list of players in the league
   *
   */
  _addPlayersToLeague(leagueId, playersList) {
    this.players[leagueId] = playersList;
    this.emit("change");
  }


  /**
   * Given an array of leagueIds, the function loads the players from that pro
   * league
   *
   * @param {array} leagueIds - integer ids corresponding to the pro league to
   *                            load players from
   */
  _loadPlayersInLeagues(leagueIds) {
    let i = 0;
    for(; i < leagueIds.length; i++) {
      this._loadPlayersInLeague(leagueIds[i]);
    }
  }


  /**
   * Given a leagueId, the function loads the players from that pro league
   *
   * @param {int} leagueId - id corresponding to the pro league to load players
   *                         from
   */
  _loadPlayersInLeague(leagueId) {
    if(this.players[leagueId]) {
      // TODO: handle data staleness
      return;
    } else {
      let that = this;

      // make request to server to get players in pro league
      APIRequest.get({
        api: "LeagueSpot",
        apiExt: "/players/view_league/" + leagueId
      }).then((resp) => {
        if (resp.success) {
          that._addPlayersToLeague(leagueId, resp.players);
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
   * Returns the players object
   *
   */
  getPlayers() {
    return this.players;
  }

}

const playerStore = new PlayerStore;
dispatcher.register(playerStore._handleActions.bind(playerStore));

export default playerStore;
