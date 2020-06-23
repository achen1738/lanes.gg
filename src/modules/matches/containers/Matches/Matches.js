import React from 'react';
import { connect } from 'react-redux';
import { getMatches, getDDragon, getSummoner, getRunes, getItems } from '../../../user/selectors';
import { withRouter } from 'react-router-dom';
import './Matches.scss';
import Match from '../../components/Match';

const Matches = props => {
  const renderMatches = () => {
    return props.matches.map((match, index) => {
      return (
        <Match
          summoner={props.summoner}
          ddragon={props.ddragon}
          key={index}
          game={match}
          runes={props.runes}
          items={props.items}
          matchIndex={index}
        ></Match>
      );
    });
  };

  return <div className="matches">{renderMatches()}</div>;
};

const mapStateToProps = state => {
  return {
    matches: getMatches(state),
    ddragon: getDDragon(state),
    summoner: getSummoner(state),
    runes: getRunes(state),
    items: getItems(state)
  };
};

export default withRouter(connect(mapStateToProps, {})(Matches));
