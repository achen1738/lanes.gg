import React, { Component } from "react";
import Info from "./summonerInfo";
class Body extends Component {
  constructor() {
    super();
    this.updateSummoner();
  }

  async updateSummoner() {
    const username = window.location.search.substring(10);
    await fetch("http://localhost:5000/update/" + username, {
      method: "PATCH"
    });
  }

  state = {};
  render() {
    return (
      <div class="summonerPage">
        <div class="summonerContent summonerFS">
          <Info />
        </div>
      </div>
    );
  }
}

export default Body;
