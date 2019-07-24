import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatches, getDDragon, getSummoner, getRunes } from '../../user/selectors';
import { withRouter } from 'react-router-dom';
import './Matches.scss';
import Match from '../components/Match';
class Matches extends Component {
  state = {};

  renderMatches = () => {
    return this.props.matches.map((match, index) => {
      return (
        <Match
          summoner={this.props.summoner}
          ddragon={this.props.ddragon}
          key={index}
          game={match}
          runes={this.props.runes}
        ></Match>
      );
    });
  };

  render() {
    return <div className="matches">{this.renderMatches()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    matches: getMatches(state),
    ddragon: getDDragon(state),
    summoner: getSummoner(state),
    runes: getRunes(state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Matches)
);
