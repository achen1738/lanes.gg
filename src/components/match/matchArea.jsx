import React, { Component } from "react";
import Overview from "./../overview/matchOverview";
import MatchList from "./matchList";

class MatchArea extends Component {
  state = {};

  render() {
    return (
      <div className="summonerMatches matchesSize">
        <div className="Content">
          <Overview {...this.props} />
          <MatchList {...this.props} />
        </div>
      </div>
    );
  }
}

export default MatchArea;
