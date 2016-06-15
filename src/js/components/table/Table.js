import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default class Table extends React.Component {
  render() {
    let that = this;

    return (
      <div className="table">

        <TableHeader
            titles={this.props.titles}
            coloredHeader={this.props.coloredHeader}
            widths={this.props.widths}
            dataOrder={this.props.dataOrder} />

        {this.props.data.map(function(rowData) {
          return <TableRow
                    dataOrder={that.props.dataOrder}
                    dataTypes={that.props.dataTypes}
                    widths={that.props.widths}
                    data={rowData} />
        })}

        { this.props.data.length === 0 ? <TableRow noData={true} /> : "" }

      </div>
    );
  }
}
