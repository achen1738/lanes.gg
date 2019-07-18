import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatches } from '../../user/selectors';
import './Matches.scss';
class Matches extends Component {
  state = {};

  renderMatches = () => {
    return this.props.matches.map((match, index) => {
      return (
        <div className="matches__match" key={index}>
          SAD
        </div>
      );
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

export default connect(
  mapStateToProps,
  {}
)(Matches);
