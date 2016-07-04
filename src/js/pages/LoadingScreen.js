import React from "react";

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="padTop center" style={this.props.style}>
        <img className={this.props.small ? "spinner padTop" :"spinner fullPage"} src="./img/spinner.svg"></img>
      </div>
    );
  }
}
