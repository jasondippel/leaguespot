import React from "react";
import APIRequest from "../../scripts/APIRequest";
import Table from "../table/Table";

export default class Standings extends React.Component {
  constructor() {
    super()
  }

  getData() {
    let testData = [
      {
        "team_id": 1,
        "team_name": "Test Team 1",
        "current_rank": 1,
        "previous_weeks_rank": 2,
        "total_points": 123,
        "current_weeks_points": 30
      },
      {
        "team_id": 2,
        "team_name": "Test Team 2",
        "current_rank": 2,
        "previous_weeks_rank": 3,
        "total_points": 100,
        "current_weeks_points": 12
      },
      {
        "team_id": 3,
        "team_name": "Test Team 3",
        "current_rank": 3,
        "previous_weeks_rank": 1,
        "total_points": 98,
        "current_weeks_points": 0
      },
      {
        "team_id": 4,
        "team_name": "Test Team 4",
        "current_rank": 4,
        "previous_weeks_rank": 4,
        "total_points": 90,
        "current_weeks_points": 20
      },
      {
        "team_id": 5,
        "team_name": "Test Team 5",
        "current_rank": 5,
        "previous_weeks_rank": 5,
        "total_points": 80,
        "current_weeks_points": 14
      }
    ];

    // compute rank_change and add to data
    testData.map(function(entry, index) {
      let rankChange = entry.previous_weeks_rank - entry.current_rank;
      testData[index].rank_change = rankChange;
    });

    return testData;
  }

  wideStandings() {
    let tableHeaders = {
      "team_name": "Team",
      "total_points": "Score",
      "rank_change": "Movement in Standings",
      "current_weeks_points": "Weekly Score"
    };
    let widths = { /* percentages */
      "team_name": 30,
      "total_points": 20,
      "rank_change": 25,
      "current_weeks_points": 25
    };
    let dataOrder = [
      "team_name",
      "total_points",
      "rank_change",
      "current_weeks_points"
    ];
    let dataTypes = {
      "team_name": "text",
      "total_points": "text",
      "rank_change": "numerical_change",
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
    )
  }

  simpleStandings() {
    return (<span>test</span>);
  }

  render() {
    let component;

    if(this.props.wide) {
      component = this.wideStandings();
    } else {
      component = this.simpleStandings();
    }

    return component;
  }
}
