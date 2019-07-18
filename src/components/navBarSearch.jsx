import React, { Component } from "react";
import "./../css/navBar.css";
import "./../css/searchBar.css";
import SearchBar from "./searchBar";

let styles = {
  display: "flex"
};

class navBarSearch extends Component {
  state = {};

  render() {
    return (
      <div className="header-wrapper">
        <div className="header" style={styles}>
          <div className="left-nav">
            <SearchBar />
          </div>
          <div className="right-nav">
            <ul className="options">
              <li className="site site-dark">Home</li>
              <li className="site site-dark">About</li>
              <li className="site site-dark">Leaderboards</li>
              <li className="site site-dark quickswitcher">
                <span>Light/Dark</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default navBarSearch;
