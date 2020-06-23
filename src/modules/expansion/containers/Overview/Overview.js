import React from 'react';
import './Overview.scss';
import { connect } from 'react-redux';
import { getMatch, getDDragon, getSummoner, getRunes, getItems } from '../../selectors';

import OverviewCell from '../../components/OverviewCell';
import OverviewHeader from '../../components/OverviewHeader';

const Overview = props => {
  const renderCells = arr => {
    const participants = props.match.participants;
    const participantIdentities = props.match.participantIdentities;

    return arr.map(num => {
      return (
        <OverviewCell
          {...props}
          participant={participants[num]}
          identity={participantIdentities[num]}
        />
      );
    });
  };

  return (
    <div className="overview">
      <OverviewHeader {...props} />
      <div className="overview__boxscore--header">
        <div className="overview__boxscore--header-group">
          <div>KDA</div>
          <div>CS</div>
          <div>Gold</div>
          <div>Damage</div>
          <div>Rank</div>
        </div>
        <div className="overview__boxscore--header-group">
          <div>KDA</div>
          <div>CS</div>
          <div>Gold</div>
          <div>Damage</div>
          <div>Rank</div>
        </div>
      </div>
      <div className="overview__boxscore">
        <div className="overview__boxscore--group">{renderCells([0, 1, 2, 3, 4])}</div>
        <div className="overview__boxscore--group">{renderCells([5, 6, 7, 8, 9])}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    match: getMatch(state, props.matchIndex),
    ddragon: getDDragon(state),
    summonerSpells: getSummoner(state),
    runes: getRunes(state),
    items: getItems(state)
  };
};

export default connect(mapStateToProps, {})(Overview);
