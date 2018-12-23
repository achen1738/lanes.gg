import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import MainImage from "../images/oie-t-rotated.png";
import "./../css/searchBar.css";
class SearchBar extends Component {
  //   state = {};
  constructor() {
    super();
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

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
          </div>
          <form
            className="search-form"
            autocomplete="off"
            action="/lol/summoner"
            // onSubmit={this.handleSubmit}
            method="get"
          >
            <div className="search search-form-att" id="search-form--size">
              <input
                className="search-bar search-form-text"
                type="text"
                name="userName"
                value={this.state.value}
                placeholder="League IGN"
                onChange={this.handleChange}
              />
              <div id="s-circle" />
              <span />
            </div>
          </form>
        </div>
      </BrowserRouter>
    );
  }
}

export default SearchBar;
