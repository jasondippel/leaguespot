import React from "react";
import APIRequest from "../../scripts/APIRequest";
import Table from "../table/Table";

export default class Roster extends React.Component {
  constructor() {
    super()
  }

  getData() {
    let testActiveData = [
      {
        "player_id": 1,
        "player_name": "Lebron James",
        "weekly_fantasy_points": 23,
        "games_remaining": 3,
        "team_rank": 2,
        "total_fantasy_points": 1235,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 2,
        "player_name": "Steph Curry",
        "weekly_fantasy_points": 42,
        "games_remaining": 2,
        "team_rank": 1,
        "total_fantasy_points": 1235,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 3,
        "player_name": "Kyle Lowry",
        "weekly_fantasy_points": 3,
        "games_remaining": 2,
        "team_rank": 12,
        "total_fantasy_points": 1235,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 4,
        "player_name": "DeMar DeRozan",
        "weekly_fantasy_points": 18,
        "games_remaining": 2,
        "team_rank": 4,
        "total_fantasy_points": 1235,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 5,
        "player_name": "Jared Dudley",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      }
    ];

    let testFullData = [
      {
        "player_id": 1,
        "player_name": "Lebron James",
        "weekly_fantasy_points": 23,
        "games_remaining": 3,
        "team_rank": 2,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 2,
        "player_name": "Steph Curry",
        "weekly_fantasy_points": 42,
        "games_remaining": 2,
        "team_rank": 1,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 3,
        "player_name": "Kyle Lowry",
        "weekly_fantasy_points": 3,
        "games_remaining": 2,
        "team_rank": 12,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 4,
        "player_name": "DeMar DeRozan",
        "weekly_fantasy_points": 18,
        "games_remaining": 2,
        "team_rank": 4,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 5,
        "player_name": "Jared Dudley",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 6,
        "player_name": "JJ Redick",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 7,
        "player_name": "Andre Drummond",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 8,
        "player_name": "Glen Davis",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 9,
        "player_name": "Marcus Morris",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 10,
        "player_name": "Donatas Montiejunas",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 11,
        "player_name": "Brook Lopez",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 12,
        "player_name": "Jeremy Tyler",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 13,
        "player_name": "Avery Bradley",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 14,
        "player_name": "Demarcus Cousins",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      },
      {
        "player_id": 15,
        "player_name": "Iman Shumpert",
        "weekly_fantasy_points": 0,
        "games_remaining": 4,
        "team_rank": 14,
        "total_fantasy_points": 1235,
        "team_overall_rank": 1,
        "player_age": 31,
        "games_played": 34,
        "avg_minutes": 35.6,
        "avg_pts": 28.4,
        "avg_ast": 6.8,
        "avg_rbd": 7.2,
        "avg_stl": 1.7,
        "avg_blk": 0.8,
        "avg_tov": 3.4
      }
    ];

    // TODO: do we need to find rank? or is that given?

    if(this.props.type === "active") {
      return testActiveData;
    } else {
      return testFullData;
    }
  }

  activeRoster() {
    let tableHeaders = {
      "player_name": "Player",
      "weekly_fantasy_points": "Weekly Fantasy Points",
      "games_remaining": "Games Remaining",
      "team_rank": "Team Ranking"
    };
    let widths = { /* percentages */
      "player_name": 30,
      "weekly_fantasy_points": 30,
      "games_remaining": 20,
      "team_rank": 20
    };
    let dataOrder = [
      "player_name",
      "weekly_fantasy_points",
      "games_remaining",
      "team_rank"
    ];
    let dataTypes = {
      "team_name": "text",
      "total_points": "text",
      "rank_change": "text",
      "current_weeks_points": "text"
    };

    let data = this.getData();

    return (
      <span>
        <Table
          titles={tableHeaders}
          widths={widths}
          data={data}
          dataOrder={dataOrder}
          dataTypes={dataTypes}
        />
      </span>
    );
  }

  fullRoster() {
    let tableHeaders = {
      "player_name": "Player",
      "player_age": "Age",
      "team_overall_rank": "Overall Ranking",
      "team_rank": "Weekly Ranking",
      "total_fantasy_points": "Total Fantasy Points",
      "weekly_fantasy_points": "Weekly Fantasy Points",
      "games_played": "Games",
      "avg_minutes": "MIN",
      "avg_pts": "PTS",
      "avg_ast": "AST",
      "avg_rbd": "RBD",
      "avg_stl": "STL",
      "avg_blk": "BLK",
      "avg_tov": "TOV"
    };
    let widths = { /* percentages */
      "player_name": 20,
      "player_age": 5,
      "team_rank": 5,
      "team_overall_rank": 10,
      "total_fantasy_points": 10,
      "weekly_fantasy_points": 10,
      "games_played": 5,
      "avg_minutes": 5,
      "avg_pts": 5,
      "avg_ast": 5,
      "avg_rbd": 5,
      "avg_stl": 5,
      "avg_blk": 5,
      "avg_tov": 5
    };
    let dataOrder = [
      "player_name",
      "player_age",
      "games_played",
      "team_overall_rank",
      "total_fantasy_points",
      "team_rank",
      "weekly_fantasy_points",
      "avg_minutes",
      "avg_pts",
      "avg_ast",
      "avg_rbd",
      "avg_stl",
      "avg_blk",
      "avg_tov"
    ];
    let dataTypes = {
      "player_name": "text",
      "player_age": "text",
      "team_rank": "text",
      "team_overall_rank": "text",
      "total_fantasy_points": "text",
      "weekly_fantasy_points": "text",
      "games_played": "text",
      "avg_minutes": "text",
      "avg_pts": "text",
      "avg_ast": "text",
      "avg_rbd": "text",
      "avg_stl": "text",
      "avg_blk": "text",
      "avg_tov": "text"
    };

    let data = this.getData();

    return (
      <span>
        <Table
          titles={tableHeaders}
          widths={widths}
          data={data}
          dataOrder={dataOrder}
          dataTypes={dataTypes}
        />
      </span>
    );
  }

  render() {
    let component;

    if(this.props.type === "active") {
      component = this.activeRoster();
    } else {
      component = this.fullRoster();
    }

    return component;
  }
}
