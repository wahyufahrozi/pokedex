import React, { Component } from "react";
import "../../Styles/style.css";

export default class HeaderComponents extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            <img
              src={require("../../Assets/logo.png")}
              width={100}
              height={50}
              alt="logo pokemon"
            />
          </a>
        </nav>
      </div>
    );
  }
}
