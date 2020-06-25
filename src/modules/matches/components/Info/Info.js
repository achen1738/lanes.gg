import React from 'react';
import './Info.scss';

const Info = props => {
  const match = props.userMatch;
  const game = props.game;
  const calculateTime = () => {
    let date = new Date();
    // Both gameTimestamp and currentTimestamp are in milliseconds
    const gameTimestamp = game.gameCreation;
    const currentTimestamp = date.getTime();

    // Get the time of when the game started (current time - end of game time - duration time)
    const time = Math.floor((currentTimestamp - gameTimestamp) / 1000) - game.gameDuration;
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

  const calculateDuration = () => {
    const gameMinutes = Math.floor(game.gameDuration / 60);
    const gameSeconds = game.gameDuration % 60;
    const duration = `${gameMinutes}m ${gameSeconds}s`;
    return duration;
  };

  const calculateResult = win => {
    if (win) return 'Victory';
    else return 'Loss';
  };

  const win = match.win;

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
      <div className={matchResultStyle}>{calculateResult(win)}</div>
      <div className={matchBarStyle}></div>
      <div className="match__info-duration">{calculateDuration()}</div>
      <div className="match__info-time">{calculateTime()}</div>
    </div>
  );
};

export default Info;
