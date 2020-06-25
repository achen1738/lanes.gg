import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../../../user/selectors';
import './Matches.scss';
import MatchContainer from '../../components/MatchContainer';

const Matches = props => {
  const renderMatches = () => {
    return props.games.map(game => {
      return <MatchContainer game={game} key={game.gameId}></MatchContainer>;
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
