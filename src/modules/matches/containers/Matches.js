import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatches } from '../../user/selectors';
import { withRouter } from 'react-router-dom';
import { WIN } from '../constants';
import './Matches.scss';
import Match from '../components/Match';
class Matches extends Component {
  state = {};

  calculateWin = match => {
    const username = this.props.match.params.username.toLowerCase();
    for (let participant of match.participantIdentities) {
      const participantName = participant.player.summonerName.toLowerCase();
      if (username === participantName) {
        let team;
        if (participant.participantId < 6) team = match.teams[0];
        else team = match.teams[1];
        return team.win === WIN;
      }
    }
    return true;
  };

  renderMatches = () => {
    return this.props.matches.map((match, index) => {
      const win = this.calculateWin(match);
      console.log(win, typeof win);
      return <Match key={index} win={win}></Match>;
    });
  };

  render() {
    return <div className="matches">{this.renderMatches()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    matches: getMatches(state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Matches)
);
