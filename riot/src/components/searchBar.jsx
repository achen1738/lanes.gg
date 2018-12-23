import React, { Component } from "react";
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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default SearchBar;
