import React, { Component } from "react";
import MainImage from "../images/oie-t-rotated.png";
import "./../css/main_page.css";
class searchBar extends Component {
  //   state = {};
  render() {
    return (
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
        </div>
        <form
          className=" search-form"
          id="a"
          autocomplete="off"
          action="summoner.html"
          method="get"
        >
          <div className="search-form--att" id="search-form--size">
            <input
              className="search-form--text "
              type="text"
              name="userName"
              placeholder="Search League of Legends IGN"
              id="o"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default searchBar;
