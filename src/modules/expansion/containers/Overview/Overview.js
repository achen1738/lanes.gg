import React, { useEffect, useState } from 'react';
import './Overview.scss';

import OverviewCell from '../../components/OverviewCell';
import OverviewHeader from '../../components/OverviewHeader';

const Overview = props => {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);

  useEffect(() => {
    const createTeam = teamId => {
      const team = props.matches.filter(match => match.teamId === teamId);
      return team;
    };
    setBlueTeam(createTeam(100));
    setRedTeam(createTeam(200));
  }, [props]);

  const renderTeam = team => {
    return team.map((match, index) => {
      return <OverviewCell key={match.gameId + ':' + index} match={match} />;
    });
  };

  return (
    <div className="overview">
      <OverviewHeader blueTeam={blueTeam} redTeam={redTeam} />
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
        <div className="overview__boxscore--group">{renderTeam(blueTeam)}</div>
        <div className="overview__boxscore--group">{renderTeam(redTeam)}</div>
      </div>
    </div>
  );
};

export default Overview;
