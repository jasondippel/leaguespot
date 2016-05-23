/**
 * General Layout for all pages. Contains Header, Footer, and the container,
 * which is where the more page-specific info will be displayed.
 */

import React from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <div>
        <Header/>

        <div className="container">
          {this.props.children}
        </div>

        <Footer/>
      </div>

    );
  }
}
