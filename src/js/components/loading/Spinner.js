import React from "react";

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="darkContainer padTop center">
        <img className="spinner component" src="./img/spinner.svg"></img>
      </div>
    );
  }
}
