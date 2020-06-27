import React, { useEffect } from 'react';
import './User.scss';
import { connect } from 'react-redux';
import Header from '../../../../components/header';
import { getMatches, getSummoner, getChampions } from '../../selectors';
import { getUserDetails, getDDragon } from '../../actions';
import Matches from '../../../matches/containers/Matches';
const User = props => {
  useEffect(() => {
    if (!props.summoner.summonerLevel) {
      props.getUserDetails();
    }
    if (!props.champions[1]) {
      props.getDDragon();
    }
  }, [props]);

  return (
    <div className="app">
      <Header />
      <div className="body">
        <div className="left"></div>
        <div className="right">
          <Matches />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    matches: getMatches(state),
    summoner: getSummoner(state),
    champions: getChampions(state)
  };
};

export default connect(mapStateToProps, { getUserDetails, getDDragon })(User);
