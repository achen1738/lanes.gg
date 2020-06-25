import React from 'react';
import { connect } from 'react-redux';
import { getDDragon, getRunes, getSummonerSpells } from '../../../user/selectors';
import { v4 as uuidv4 } from 'uuid';

const Match = props => {
  const renderChildren = () => {
    return props.children.map(child => {
      return (
        <div key={uuidv4()} className="match__summary-cell">
          {React.cloneElement(child, {
            userMatch: props.userMatch,
            summonerSpells: props.summonerSpells,
            runes: props.runes,
            ddragon: props.ddragon
          })}
        </div>
      );
    });
  };

  return <>{renderChildren()}</>;
};

const mapStateToProps = state => {
  return {
    summonerSpells: getSummonerSpells(state),
    runes: getRunes(state),
    ddragon: getDDragon(state)
  };
};

export default connect(mapStateToProps, {})(Match);
