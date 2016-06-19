import React from "react";

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="darkContainer padTop center">
        <img className="spinner fullPage" src="./img/spinner.svg"></img>
      </div>
    );
  }
}
