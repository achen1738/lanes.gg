import React, { Component } from "react";
import Graph from "./overviewGraph";
import FrequentlyPlayed from "./frequentlyPlayed";
import "./../../css/main_page.css";

class Overview extends Component {
  state = {};

  render() {
    return (
      <div className="overview">
        <div className="overviewBorder">
          <div className="recentStats">
            <Graph {...this.props} />
            <FrequentlyPlayed {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
