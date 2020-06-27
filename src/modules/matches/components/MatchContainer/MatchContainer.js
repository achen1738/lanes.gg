import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MatchContainer.scss';

import { connect } from 'react-redux';
import { getUserMatch, getDisplayMatches, getItems } from '../../../user/selectors.js';
import Match from '../Match/Match';

import Info from '../Info';
import Champ from '../Champ';
import Stats from '../Stats';
import Items from '../Items';
import Players from '../Players';
import Expand from '../../containers/Expand';
import Expansion from '../../../expansion/containers/Expansion';

const MatchContainer = props => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const win = props.userMatch.win;
  let matchStyle = 'match';
  if (win) matchStyle += ' match_win';
  else matchStyle += ' match_lose';

  let matchSummaryStyle = 'match__summary';
  if (win) matchSummaryStyle += ' match__summary_win';
  else matchSummaryStyle += ' match__summary_lose';

  const renderExpansion = () => {
    if (expanded) return <Expansion gameId={props.game.gameId} />;
    return null;
  };
  return (
    <div className="match-container">
      <div className={matchStyle}>
        <div className={matchSummaryStyle}>
          <Match userMatch={props.userMatch}>
            <Info game={props.game} />
            <Champ />
            <Stats game={props.game} />
            <Items items={props.items} />
            <Players items={props.items} displayMatches={props.displayMatches} />
            <Expand handleExpand={handleExpand} />
          </Match>
        </div>
        {renderExpansion()}
      </div>
    </div>
  );
};

MatchContainer.propTypes = {
  game: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const gameId = ownProps.game.gameId;
  return {
    userMatch: getUserMatch(state, gameId),
    displayMatches: getDisplayMatches(state, gameId),
    items: getItems(state)
  };
};

export default connect(mapStateToProps, {})(MatchContainer);
