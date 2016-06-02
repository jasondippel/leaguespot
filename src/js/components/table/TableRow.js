import React from "react";
import TableCell from "./TableCell";

export default class TableRow extends React.Component {
  render() {
    let that = this;
    let row;

    if(this.props.noData) {
      row = (
        <div className="tableRow noData">
          No Results Found
        </div>
      );
    }
    else {
      row = (
        <div className="tableRow">
          {this.props.dataOrder.map(function(key) {
            return <TableCell width={that.props.widths[key]}
                              type={that.props.dataTypes[key]}
                              value={that.props.data[key]} />
          })}
        </div>
      );
    }

    return row;
  }
}
