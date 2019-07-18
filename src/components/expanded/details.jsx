import React, { Component } from "react";
import BoxScore from "./boxscore";
import Builds from "./builds/builds";
import Lanes from "./lanes";
import "./../../css/expanded.css";

class Details extends Component {
  state = { expanded: {}, timeline: {} };

  async componentDidMount() {
    var expanded = {
      overview: true,
      build: false,
      lanes: false
    };
    const matchID = this.props.match.matchID;
    const resp = await fetch("http://localhost:5000/timeline/" + matchID);
    const timeline = await resp.json();
    console.log(timeline);
    console.log(this.props.matches);
    this.setState({ expanded, timeline });
  }

  expand(e) {
    const tag = e.currentTarget.getAttribute("tab");
    if (!this.state.expanded[tag]) {
      const types = ["overview", "build", "lanes"];
      var expanded = {};
      types.forEach(type => {
        // console.log(tag, type);
        expanded[type] = type === tag;
      });
      // console.log(expanded);
      this.setState({ expanded });
    }
  }

  createDetails() {
    const exp = this.state.expanded;
    if (exp.overview) {
      return <BoxScore {...this.props} timeline={this.state.timeline} />;
    } else if (exp.build) {
      return <Builds {...this.props} timeline={this.state.timeline} />;
    } else if (exp.lanes) {
      return <Lanes {...this.props} timeline={this.state.timeline} />;
    }
  }

  createTabs() {
    const win = this.props.match.win;
    var colorClass, tabColor;
    if (win === 0) {
      colorClass = "blue";
      tabColor = "Won";
    } else {
      colorClass = "red";
      tabColor = "Lost";
    }
    return (
      <ul className={`tabs ${colorClass}`}>
        <li
          className={
            `tabLinks ${tabColor} ` +
            (this.state.expanded.overview ? "active" : "")
          }
        >
          <div tab="overview" onClick={e => this.expand(e)}>
            Overview
          </div>
        </li>
        <li
          className={
            `tabLinks ${tabColor} ` +
            (this.state.expanded.build ? "active" : "")
          }
        >
          <div tab="build" onClick={e => this.expand(e)}>
            Builds
          </div>
        </li>
        <li
          className={
            `tabLinks ${tabColor} ` +
            (this.state.expanded.lanes ? "active" : "")
          }
        >
          <div tab="lanes" onClick={e => this.expand(e)}>
            Lanes
          </div>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.createTabs()}
        {this.createDetails()}
      </React.Fragment>
    );
  }
}

export default Details;
