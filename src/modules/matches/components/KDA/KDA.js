import React, { Component } from 'react';
import './KDA.scss';

class KDA extends Component {
  state = {};

  renderKDA = () => {
    const stats = this.props.game.participants[this.props.userIndex].stats;
    const { kills, deaths, assists } = stats;
    let ratio;
    if (deaths === 0) ratio = 'Perfect';
    else ratio = ((kills + assists) / deaths).toFixed(1);
    return (
      <>
        <div className="match__KDA-numbers">
          <span className="match__KDA-number">{kills}</span>
          <span className="match__KDA-separator">/</span>
          <span className="match__KDA-number">{deaths}</span>
          <span className="match__KDA-separator">/</span>
          <span className="match__KDA-number">{assists}</span>
        </div>
        <div className="match__KDA-ratio-container">
          <span className="match__KDA-ratio">{ratio}</span>
          <span className="match__KDA-ratio-text">KDA</span>
        </div>
      </>
    );
  };

  renderCS = () => {
    const gameDuration = this.props.game.gameDuration;
    const stats = this.props.game.participants[this.props.userIndex].stats;
    const { totalMinionsKilled, neutralMinionsKilled } = stats;
    const totalCS = totalMinionsKilled + neutralMinionsKilled;
    const CSPM = (totalCS / gameDuration / 60).toFixed(1);
  };
  render() {
    return <div className="match__KDA">{this.renderKDA()}</div>;
  }
}

export default KDA;
