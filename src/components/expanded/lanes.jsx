import React, { Component } from "react";
import Kill from "./../../images/kill.png";
import RedX from "./../../images/redX.png";

class Lanes extends Component {
  state = {
    visible: {
      top: true,
      jungle: false,
      mid: false,
      bottom: false
    },
    top: [],
    jungle: [],
    mid: [],
    bottom: [],
    userTeam: null,
    id2ChampID: {},
    assistLocations: [
      ["oneAssist"],
      ["l2Assist", "r2Assist"],
      ["l3Assist", "m3Assist", "r3Assist"],
      ["l4Assist", "bl4Assist", "br4Assist", "r4Assist"]
    ]
  };

  componentWillMount() {
    // console.log(this.props.timeline);
    const timelineObj = this.props.timeline;
    const top = this.dividePath(timelineObj.TOP);
    const jungle = this.dividePath(timelineObj.JUNGLE);
    const mid = this.dividePath(timelineObj.MIDDLE);
    const bottom = this.dividePath(timelineObj.BOTTOM);
    const userTeam = this.props.match.teamID;
    const matches = this.props.matches;
    var id2ChampID = {};
    matches.forEach(match => {
      id2ChampID[match.participantID] = match.championID;
    });
    this.setState({ top, jungle, mid, bottom, userTeam, id2ChampID });
  }

  dividePath(path) {
    if (typeof path === "undefined") return [];
    const len = path.length;
    if (len === 0 || len === 1) return path;
    var divided = [];
    var subArr = [path[0]];
    var currentTimestamp = path[0].timestamp;
    for (var i = 1; i < len; i++) {
      const currentKill = path[i];
      if (currentKill.timestamp < currentTimestamp + 45000) {
        subArr.push(currentKill);
      } else {
        divided.push(subArr);
        subArr = [currentKill];
        currentTimestamp = currentKill.timestamp;
      }

      if (i === len - 1) divided.push(subArr);
    }
    return divided;
  }

  expand(e) {
    const lane = e.currentTarget.getAttribute("lane");
    var visible = {
      top: false,
      jungle: false,
      mid: false,
      bottom: false
    };
    visible[lane] = true;
    this.setState({ visible });
  }

  createTabs() {
    const convenienceArray = ["top", "jungle", "mid", "bottom"];
    return (
      <ul
        className={
          "pathTabs " + (this.props.match.win === 0 ? "winLane" : "loseLane")
        }
      >
        {convenienceArray.map(lane => {
          return (
            <li
              key={lane}
              lane={lane}
              className={
                "pathTabLinks " +
                (this.state.visible[lane] ? "buildActive " : "")
              }
              onClick={e => this.expand(e)}
            >
              <svg className="icon" height="30" width="30">
                <use href={`#icon-${lane}`} />
              </svg>
              <svg className="iconCircle" height="60" width="60">
                <use href={`#icon-circle`} />
              </svg>
            </li>
          );
        })}
      </ul>
    );
  }

  createDescription(arr) {
    const len = arr.length;
    var text;
    if (len === 1) text = "Solo";
    if (len === 2) {
      var first = arr[0].killerId;
      var second = arr[1].killerId;
      if (first === second) text = "Double";
      else if ((first <= 5 && second <= 5) || (first > 5 && second > 5))
        text = "Double";
      else text = "1 for 1";
    } else {
      var data = {
        100: {},
        200: {}
      };

      arr.forEach(kill => {
        const killer = kill.killerId;
        const team = killer <= 5 ? 100 : 200;
        data[team][killer] = data[team][killer] || 0;
        data[team][killer] += 1;
      });

      const tradeTypes = ["One", "Two", "Three", "Four", "Ace"];
      const killTypes = ["Solo", "Double", "Triple", "Quadra", "Penta"];
      const blueSide = Object.keys(data[100]);
      const redSide = Object.keys(data[200]);
      const blueLen = blueSide.length;
      const redLen = redSide.length;
      if (blueLen === 0) {
        if (redLen === 1) text = killTypes[data[200][redSide[0]] - 1];
        else {
          const sum = Object.values(data[200]).reduce((a, b) => a + b, -1);
          text = tradeTypes[sum] + " for Zero";
        }
      } else if (redLen === 0) {
        if (blueLen === 1) text = killTypes[data[100][blueSide[0]] - 1];
        else {
          const sum = Object.values(data[100]).reduce((a, b) => a + b, -1);
          text = tradeTypes[sum] + " for Zero";
        }
      } else {
        var leftText;
        var rightText;
        const blueSum = Object.values(data[100]).reduce((a, b) => a + b, -1);
        const redSum = Object.values(data[200]).reduce((a, b) => a + b, -1);
        blueSum > redSum
          ? (leftText = tradeTypes[blueSum])
          : (leftText = tradeTypes[redSum]);
        blueSum > redSum
          ? (rightText = tradeTypes[redSum])
          : (rightText = tradeTypes[blueSum]);
        text = `${leftText} for ${rightText}`;
      }
    }
    return <div className="killDesc">{text}</div>;
  }

  createAssists(arr) {
    if (typeof arr === "undefined") return null;
    const id2ChampID = this.state.id2ChampID;
    const len = arr.length;
    var counter = -1;
    return (
      <div className={"assistKills "}>
        {arr.map(assistID => {
          counter++;
          return (
            <React.Fragment key={assistID}>
              <div className={this.state.assistLocations[len - 1][counter]}>
                <img
                  src={
                    this.props.champURL +
                    this.props[id2ChampID[assistID]].image.full
                  }
                  alt="Champion!"
                />
              </div>
              <div
                className={"svg" + this.state.assistLocations[len - 1][counter]}
              >
                <svg
                  className="statRuneBorder"
                  height="25"
                  width="25"
                  version="1.1"
                >
                  <circle
                    cx="12.5"
                    cy="12.5"
                    r="10"
                    className="statCircle"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  createKills(arr) {
    const id2ChampID = this.state.id2ChampID;
    return arr.map(kill => {
      const killerTeam = kill.killerId > 5 ? 200 : 100;
      const killerId = kill.killerId;
      const victimId = kill.victimId;
      return (
        <div
          key={kill.timestamp}
          className={
            "champKill " +
            (this.state.userTeam === killerTeam ? "teamKill" : "enemyKill")
          }
        >
          <div className="aliveSide relative">
            <img
              src={
                this.props.champURL +
                this.props[id2ChampID[killerId]].image.full
              }
              alt="Champion!"
            />
            {this.createAssists(kill.assistingParticipantIds)}
          </div>
          <div className="killDivider">
            <img src={Kill} alt="Kill!" />
          </div>
          <div className="deadSide relative">
            <img
              className="deadImage"
              src={
                this.props.champURL +
                this.props[id2ChampID[victimId]].image.full
              }
              alt="Champion!"
            />
            <img className="redX" src={RedX} alt="Red X!" />
            {this.createAssists(kill.assistingParticipantIDs)}
          </div>
        </div>
      );
    });
  }

  createPaths() {
    const visible = this.state.visible;
    var counter = -1;
    return (
      <div
        className={
          "laneContent " +
          (this.props.match.win === 0 ? "wonLaneContent" : "lostLaneContent")
        }
      >
        {Object.keys(visible).map(lane => {
          if (this.state.visible[lane]) {
            const len = this.state[lane].length;
            console.log(this.state[lane]);
            if (len !== 0) {
              return this.state[lane].map(arr => {
                counter++;
                if (typeof arr[0] === "undefined") arr = [arr];
                const timestamp = arr[0].timestamp;
                var seconds = Math.floor(timestamp / 1000) % 60;
                const minutes = Math.floor(timestamp / 1000 / 60);
                if (seconds.toString().length === 1) seconds = "0" + seconds;

                var time = `${minutes}:${seconds}`;
                return (
                  <div key={timestamp} className="champKillContainer">
                    <div key={timestamp} className="killsContainer">
                      {this.createDescription(arr)}
                      {this.createKills(arr)}
                      <div className="champTime">{time}</div>
                    </div>
                    {counter === len - 1 ? null : (
                      <div className="champNext">&#8250;</div>
                    )}
                  </div>
                );
              });
            } else {
              return (
                <div className="emptyPath">
                  <div className="emptyText">No Kills</div>
                </div>
              );
            }
          }
          return null;
        })}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.createTabs()}
        {this.createPaths()}
      </React.Fragment>
    );
  }
}

export default Lanes;
