import React from "react";

export default class TableHeader extends React.Component {
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     /* figure out what we want as state */
  //   }
  // }

  render() {
    let that = this;

    return (
      <div className={that.props.coloredHeader ? "tableHeader colored" : "tableHeader" }>
        {this.props.dataOrder.map(function(key) {
          return (
            <div
                className="headerTitle"
                style={ {width: that.props.widths[key]+"%"} }>

                {that.props.titles[key]}

            </div>
          );
        })}
      </div>
    );
  }
}
