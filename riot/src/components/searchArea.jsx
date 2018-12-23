import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import MainImage from "../images/oie-t-rotated.png";
import SearchBar from "./searchBar";
class SearchArea extends Component {
  //   state = {};

  render() {
    return (
      <BrowserRouter>
        <div className="l-container">
          <div className="site-logo-img">
            <span className="site-img">
              <img
                src={MainImage}
                alt="Pretty main display"
                height="286"
                align="middle"
              />
            </span>
            <SearchBar />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default SearchArea;
