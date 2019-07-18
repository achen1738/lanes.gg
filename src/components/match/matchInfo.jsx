import React, { Component } from "react";
import Queues from "./../../json/queues";

class MatchInfo extends Component {
  state = {};

  createInfo() {
    const match = this.props.match;
    const queue = this.props.queue;
    const winLoss = match.win === 0 ? "Win" : "Loss";
    const gameMinutes = Math.floor(match.gameDuration / 60);
    const gameSeconds = match.gameDuration % 60;
    const duration = `${gameMinutes}m ${gameSeconds}s`;

    var date = new Date();
    // Both gameTimestamp and currentTimestamp are in milliseconds
    const gameTimestamp = match.timestamp;
    const currentTimestamp = date.getTime();

    // Get the time of when the game started (current time - end of game time - duration time)
    const time =
      Math.floor((currentTimestamp - gameTimestamp) / 1000) -
      match.gameDuration;
    const days = Math.floor(time / 86400);
    const queueObj = Queues.find(element => {
      return element.id === queue;
    });
    // console.log(queueObj);
    // console.log(match);

    var timeAgo;
    if (days === 0) {
      const seconds = time % 86400;
      const hours = Math.floor(seconds / 3600);
      if (hours === 0) {
        const minutes = Math.floor((seconds % 3600) / 60);
        timeAgo = `${minutes} minutes ago`;
      } else if (hours === 1) {
        timeAgo = `${hours} hour ago`;
      } else {
        timeAgo = `${hours} hours ago`;
      }
    } else {
      timeAgo = `${days} days ago`;
    }

    return (
      <React.Fragment>
        <div className="Queue">{queueObj.name}</div>
        <div className="TimeAgo">{timeAgo}</div>
        <div className="WinLoss">{winLoss}</div>
        <div className="Duration">{duration}</div>
      </React.Fragment>
    );
  }

  render() {
    return <div className="Info">{this.createInfo()}</div>;
  }
}

export default MatchInfo;
