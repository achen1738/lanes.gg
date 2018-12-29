import React, { Component } from "react";
import Info from "./summonerInfo";
import MatchArea from "./match/matchArea";
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
      <div className="summonerPage">
        <div className="summonerContent summonerFS">
          {this.state.components}
        </div>
      </div>
    );
  }
}

export default Body;
