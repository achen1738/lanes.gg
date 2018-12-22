import React, { Component } from "react";
import "./../css/navBar.css";
class navBar extends Component {
  //   state = {};
  render() {
    return (
      <div className="header-wrapper">
        <div className="header">
          <ul className="options">
            <button className="site">Home</button>
            <li className="site">About</li>
            <li className="site">Leaderboards</li>
            <li className="site quickswitcher">
              <span>Light/Dark</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default navBar;
