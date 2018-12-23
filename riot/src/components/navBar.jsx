import React, { Component } from "react";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import "./../css/navBar.css";
class navBar extends Component {
  //   state = {};
  render() {
    return (
      <div className="header-wrapper">
        <div className="header">
          <div className="right-nav">
            <ul className="options">
              <button className="site site-light">Home</button>
              <li className="site site-light">About</li>
              <li className="site site-light">Leaderboards</li>
              <li className="site site-light quickswitcher">
                <span>Light/Dark</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default navBar;
