import React from "react";
import moment from "moment";

export default class TableCell extends React.Component {
  _createButton(type) {
    return (
      <button className="btn greenSolidBtn">
        {type}
      </button>
    );
  }

  _getLeagueShortName(league) {
    let leagueDictionary = {
      "nba": "NBA",
      "wnba": "WNBA",
      "ncaa_mb": "NCAA MB",
      "ncaa_wb": "NCAA WB"
    };

    return leagueDictionary[league];
  }

  _createTags(tags) {
    let that = this;

    return (
      <span className="tagGroup">
        {tags.map(function(league) {
          return (
            <span className="tag">
              {that._getLeagueShortName(league)}
            </span>
          );
        })}
      </span>
    );
  }

  _createChangeLabel(number) {
    let numberOnly = Math.abs(number);
    let sign = number < 0 ? "-" : "+";

    // zero case
    if(number === 0) {
      return "-";
    }

    return (
      <span className={ sign === "-" ? "change negative" : "change positive"}>
        <span className="sign">{sign}</span>
        <span className="number">{numberOnly}</span>
      </span>
    );
  }

  render() {
    let that = this;
    let contents;

    switch (this.props.type) {
      case "datetime":
        contents = moment(
          new Date(this.props.value.replace(' ','T')+'Z')
        ).format('MMMM D, h:mma');
        break;
      case "button":
        contents = this._createButton(this.props.value);
        break;
      case "tags":
        contents = this._createTags(this.props.value);
        break;
      case "numerical_change":
        contents = this._createChangeLabel(this.props.value);
        break;
      default: /* text */
        contents = this.props.value;
    }

    return (
      <div className="tableCell" style={ {width: that.props.width+"%"} }>
        {contents}
      </div>
    );
  }
}
