import React, { Component } from "react";
import Info from "./summonerInfo";
import MatchArea from "./matchArea";
class Body extends Component {
  state = { components: 5 };

  async componentDidMount() {
    this.updateSummoner.bind(this);
    const resp = await this.props.champs;
    this.updateSummoner();
    this.setState({
      components: (
        <React.Fragment>
          <Info {...resp} />
          <MatchArea {...resp} />
        </React.Fragment>
      )
    });
  }

  async updateSummoner() {
    const username = window.location.search.substring(10);
    await fetch("http://localhost:5000/update/" + username, {
      method: "PATCH"
    });
  }

  render() {
    return (
      <div class="summonerPage">
        <div class="summonerContent summonerFS">{this.state.components}</div>
      </div>
    );
  }
}

export default Body;
