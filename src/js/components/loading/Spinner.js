import React from "react";

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="center">
        <img className="spinner component" src="./img/spinner.svg"></img>
      </div>
    );
  }
}
