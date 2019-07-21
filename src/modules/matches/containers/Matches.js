import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatches } from '../../user/selectors';
import { withRouter } from 'react-router-dom';
import './Matches.scss';
import Match from '../components/Match';
class Matches extends Component {
  state = {};

  renderMatches = () => {
    return this.props.matches.map((match, index) => {
      return <Match key={index} game={match}></Match>;
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
