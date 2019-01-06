import React, { Component } from "react";
class MatchKDA extends Component {
  state = {};

  createKDA() {
    const match = this.props.match;
    const ratio =
      match.deaths === 0
        ? "Perfect"
        : ((match.kills + match.assists) / match.deaths).toFixed(2);
    const creeps = match.totalMinionsKilled;
    const camps = match.jungleEnemy + match.jungleTeam;
    const cs = creeps + camps;
    const minutes = Math.floor(match.gameDuration / 60);
    const cspm = (cs / minutes).toFixed(1);

    return (
      <React.Fragment>
        <div className="KDA">
          <span className="Kills">{match.kills}</span> /
          <span className="Deaths"> {match.deaths}</span> /
          <span className="Assists"> {match.assists}</span>
        </div>
        <div className="Ratio">
          <span className="Ratio">{ratio} KDA</span>
        </div>
        <div className="CS">
          <span className="creeps">
            {cs} ({cspm}) CS
          </span>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return <div className="Stats">{this.createKDA()}</div>;
  }
}

export default MatchKDA;
