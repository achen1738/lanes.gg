import React, { Component } from 'react';
import './Info.scss';

class Info extends Component {
  state = {};

  calculateTime = () => {
    const match = this.props.game;
    let date = new Date();
    // Both gameTimestamp and currentTimestamp are in milliseconds
    const gameTimestamp = match.gameCreation;
    const currentTimestamp = date.getTime();

    // Get the time of when the game started (current time - end of game time - duration time)
    const time = Math.floor((currentTimestamp - gameTimestamp) / 1000) - match.gameDuration;
    const days = Math.floor(time / 86400);

    let timeAgo;
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

    return timeAgo;
  };

  calculateDuration = () => {
    const match = this.props.game;
    const gameMinutes = Math.floor(match.gameDuration / 60);
    const gameSeconds = match.gameDuration % 60;
    const duration = `${gameMinutes}m ${gameSeconds}s`;
    return duration;
  };

  calculateResult = win => {
    if (win) return 'Victory';
    else return 'Loss';
  };

  render() {
    const win = this.props.win;

    let matchInfoStyle = 'match__info';
    if (win) matchInfoStyle += ' match__info_win';
    else matchInfoStyle += ' match__info_lose';

    let matchResultStyle = 'match__info-result';
    if (win) matchResultStyle += ' match__info-result_win';
    else matchResultStyle += ' match__info-result_lose';

    let matchBarStyle = 'match__info-bar';
    if (win) matchBarStyle += ' match__info-bar_win';
    else matchBarStyle += ' match__info-bar_lose';

    return (
      <div className={matchInfoStyle}>
        <div className="match__info-queue">Ranked Solo</div>
        <div className={matchResultStyle}>{this.calculateResult(win)}</div>
        <div className={matchBarStyle}></div>
        <div className="match__info-duration">{this.calculateDuration()}</div>
        <div className="match__info-time">{this.calculateTime()}</div>
      </div>
    );
  }
}

export default Info;
