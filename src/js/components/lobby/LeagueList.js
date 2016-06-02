import React from "react";
import Table from "../table/Table";
import TableHeader from "../table/TableHeader";

export default class LeagueList extends React.Component {
  constructor() {
    super();

    this.state = {
      leagueList: {}
    };
  }

  render() {
    let tableHeaders = {
      "fantasy_league": "Fantasy League",
      "pro_leagues": "Pro Leagues",
      "draft_date": "Draft Time (EST)",
      "entries": "Entries",
      "size": "Size",
      "buttons": "" /* blank header for enter/view button */
    };
    let widths = { /* percentages */
      "fantasy_league": 20,
      "pro_leagues": 20,
      "draft_date": 20,
      "entries": 12,
      "size": 13,
      "buttons": 15
    };
    let dataOrder = [
      "fantasy_league",
      "pro_leagues",
      "entries",
      "size",
      "draft_date",
      "buttons"
    ];
    let dataTypes = {
      "fantasy_league": "text",
      "pro_leagues": "tags",
      "draft_date": "datetime",
      "entries": "text",
      "size": "text",
      "buttons": "button"
    };
    let fakeData = [
      {
        "fantasy_league": "Test League 1",
        "pro_leagues": ["nba"],
        "draft_date": "2016-06-12 20:00:00",
        "entries": 1,
        "size": 10,
        "buttons": "Enter"
      },
      {
        "fantasy_league": "Test League 2",
        "pro_leagues": ["nba", "wnba"],
        "draft_date": "2016-07-01 09:30:00",
        "entries": 12,
        "size": 50,
        "buttons": "Enter"
      },
      {
        "fantasy_league": "Test League 3",
        "pro_leagues": ["nba", "wnba", "ncaa_mb", "ncaa_wb"],
        "draft_date": "2016-06-12 20:00:00",
        "entries": 10,
        "size": 10,
        "buttons": "Enter"
      }
    ];

    return (
      <div className="leagueList">
        <Table
          titles={tableHeaders}
          widths={widths}
          data={fakeData}
          dataOrder={dataOrder}
          dataTypes={dataTypes}
        />
      </div>
    );
  }
}
