import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Match.scss';
import { WIN } from '../../constants';
import { withRouter } from 'react-router-dom';
import Info from '../Info/Info';

class Match extends Component {
  state = {};

  /**
   * Returns a boolean based on whether the user won or not
   */
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

  render() {
    const win = this.calculateWin(this.props.game);
    let matchStyle = 'match';
    if (win) matchStyle += ' match_win';
    else matchStyle += ' match_lose';

    let matchSummaryStyle = 'match__summary';
    if (win) matchSummaryStyle += ' match__summary_win';
    else matchSummaryStyle += ' match__summary_lose';

    return (
      <div className={matchStyle}>
        <div className={matchSummaryStyle}>
          <Info win={win} game={this.props.game} />
        </div>
      </div>
    );
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Match);
