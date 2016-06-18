import React from "react";

export default class TableHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      /* figure out what we want as state */
    }
  }

  sortColumn( key ) {
    if(this.props.sortColumn) {
      this.props.sortColumn(key);
    }
  }

  render() {
    let that = this;

    return (
      <div className={that.props.coloredHeader ? "tableHeader colored" : "tableHeader" }>
        {this.props.dataOrder.map(function(key) {
          return (
            <div
                className= { that.props.sortColumn !== undefined ? "headerTitle sortable" : "headerTitle" }
                style={ {width: that.props.widths[key]+"%"} }
                onClick={ () => that.sortColumn(key) } >

                {that.props.titles[key]}

            </div>
          );
        })}
      </div>
    );
  }
}
