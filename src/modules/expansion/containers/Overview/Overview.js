import React from 'react';
import './Overview.scss';

import OverviewCell from '../../components/OverviewCell';
import OverviewHeader from '../../components/OverviewHeader';

const Overview = props => {
  const renderTeam = teamId => {
    const team = props.matches.filter(match => match.teamId === teamId);
    return team.map(match => {
      return <OverviewCell match={match} />;
    });
  };

  const blueTeam = renderTeam(100);
  const redTeam = renderTeam(200);

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
        <div className="overview__boxscore--group">{blueTeam}</div>
        <div className="overview__boxscore--group">{redTeam}</div>
      </div>
    </div>
  );
};

export default Overview;
