import React from 'react';
import './Stats.scss';

const Stats = props => {
  const match = props.userMatch;
  const game = props.game;
  const renderKDA = () => {
    const { kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled } = match;
    let ratio;
    if (deaths === 0) ratio = 'Perfect';
    else ratio = ((kills + assists) / deaths).toFixed(1);
    const csKilled = totalMinionsKilled + neutralMinionsKilled;
    const gameDuration = game.gameDuration;
    const csAverage = (csKilled / (gameDuration / 60)).toFixed(1);

    return (
      <>
        <div className="match__stats-numbers">
          <span className="match__stats-number">{kills}</span>
          <span className="match__stats-separator">/</span>
          <span className="match__stats-number">{deaths}</span>
          <span className="match__stats-separator">/</span>
          <span className="match__stats-number">{assists}</span>
        </div>
        <div className="match__stats-ratio-container">
          <span className="match__stats-ratio">{ratio}</span>
          <span className="match__stats-ratio-text">KDA</span>
        </div>
        <div className="match__stats"></div>
        <div className="match__stats-cs">
          <span className="match__stats-cs-score">{csKilled}</span>
          <span className="match__stats-cs-average">{`(${csAverage})`}</span>
          <span className="match__stats-cs-text">CS</span>
        </div>
      </>
    );
  };

  return <div className="match__stats">{renderKDA()}</div>;
};

export default Stats;
