import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Match.scss';
import { connect } from 'react-redux';
import { getUserMatch, getDisplayMatches } from '../../../user/selectors';

// import Info from '../Info';
// import Champ from '../Champ';
// import Stats from '../Stats';
// import Items from '../Items';
// import Players from '../Players';
// import Expand from '../../containers/Expand';
// import Expansion from '../../../expansion/containers/Expansion';

const Match = props => {
  // eslint-disable-next-line
  const [expanded, setExpanded] = useState(false);
  const win = props.userMatch.win;

  let matchStyle = 'match';
  if (win) matchStyle += ' match_win';
  else matchStyle += ' match_lose';

  let matchSummaryStyle = 'match__summary';
  if (win) matchSummaryStyle += ' match__summary_win';
  else matchSummaryStyle += ' match__summary_lose';

  return (
    <div className="match-container">
      <div className={matchStyle}>
        <div className={matchSummaryStyle}>
          {/* <div className="match__summary-cell">
            <Info win={win} game={props.game} username={username} userIndex={userIndex} />
          </div>
          <div className="match__summary-cell">
            <Champ
              win={win}
              game={props.game}
              username={username}
              userIndex={userIndex}
              ddragon={props.ddragon}
              summonerSpells={props.summonerSpells}
              runes={props.runes}
            />
          </div>
          <div className="match__summary-cell">
            <Stats win={win} game={props.game} username={username} userIndex={userIndex} />
          </div>
          <div className="match__summary-cell">
            <Items
              win={win}
              items={props.items}
              game={props.game}
              username={username}
              userIndex={userIndex}
            />
          </div>
          <div className="match__summary-cell">
            <Players
              win={win}
              game={props.game}
              ddragon={props.ddragon}
              username={username}
              userIndex={userIndex}
            />
          </div>
          <div className="match__summary-cell">
            <Expand win={win} handleExpand={handleExpand} matchIndex={props.matchIndex} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

Match.propTypes = {
  game: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    userMatch: getUserMatch(state, ownProps.game.gameId),
    displayMatches: getDisplayMatches(state, ownProps.game.gameId)
  };
};

export default connect(mapStateToProps, {})(Match);
