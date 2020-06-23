import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../../../user/selectors';
import './Matches.scss';
import Match from '../../components/Match';

const Matches = props => {
  const renderMatches = () => {
    return props.games.map(game => {
      return <Match game={game} key={game.gameId}></Match>;
    });
  };

  return <div className="matches">{renderMatches()}</div>;
};

const mapStateToProps = state => {
  return {
    games: getGames(state)
  };
};

export default connect(mapStateToProps, {})(Matches);
