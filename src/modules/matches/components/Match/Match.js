import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Match.scss';

class Match extends Component {
  state = {};
  render() {
    let matchStyle = 'match';
    if (this.props.win) matchStyle += ' match_win';
    else matchStyle += ' match_lose';

    let matchSummaryStyle = 'match__summary';
    if (this.props.win) matchSummaryStyle += ' match__summary_win';
    else matchSummaryStyle += ' match__summary_lose';

    let matchInfoStyle = 'match__info';
    if (this.props.win) matchInfoStyle += ' match__info_win';
    else matchInfoStyle += ' match__info_lose';
    return (
      <div className={matchStyle}>
        <div className={matchSummaryStyle}>
          <div className={matchInfoStyle}>
            <div className="match__info-time">One day ago</div>
            <div className="match__info-queue">Ranked Solo</div>
            <div className="match__info_duration">34m 30s</div>
            <div className="match__info_result">Victory</div>
          </div>
        </div>
      </div>
    );
  }
}

Match.propTypes = {
  win: PropTypes.bool.isRequired
};

export default Match;
