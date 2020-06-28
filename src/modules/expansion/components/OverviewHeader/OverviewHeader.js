import React from 'react';
import { FiX } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { IconBaron, IconDragon, IconTower } from '../../../../icons/icons';
import './OverviewHeader.scss';
import { connect } from 'react-redux';
import { getChampions, getItems } from '../../selectors';
import { v4 as uuidv4 } from 'uuid';

const OverviewHeader = props => {
  const { blueTeam, redTeam } = props;
  console.log(blueTeam);

  const renderBans = (team, reversed) => {
    let sectionStyle = 'overview__section';
    if (reversed) sectionStyle += ' overview__section--reversed';

    let textStyle = 'overview__section--text';
    if (reversed) textStyle += ' overview__section--text-reversed';

    const bans = team.map((match, index) => {
      let championID = match.ban;
      console.log(championID);
      if (championID <= 0) {
        return (
          <div key={uuidv4()} className="overview__image--ban">
            <FiX />
          </div>
        );
      }
      const champ = props.champions[championID];
      let champURI = champ._full;

      return <img className="overview__image--ban" src={champURI} alt="champ banned" key={index} />;
    });

    return (
      <div className={sectionStyle}>
        <div className={textStyle}>Bans</div>
        <div className="overview__bans">{bans}</div>
      </div>
    );
  };

  const renderObjectives = (team, reversed) => {
    let iconStyle = 'icon--objective';
    if (reversed) iconStyle += ' icon--objective-blue';
    else iconStyle += ' icon--objective-red';

    let sectionStyle = 'overview__section';
    if (reversed) sectionStyle += ' overview__section--reversed';

    let textStyle = 'overview__section--text';
    if (reversed) textStyle += ' overview__section--text-reversed';
    return (
      <div className={sectionStyle}>
        <div className={textStyle + ' overview__section--objectives'}>Objectives</div>
        <div className="overview__objectives">
          <IconTower className={iconStyle} />
          <span>{0}</span>
          <IconBaron className={iconStyle} />
          <span>{0}</span>
          <IconDragon className={iconStyle} />
          <span>{0}</span>
        </div>
      </div>
    );
  };

  const renderKills = (team, reversed) => {
    let sectionStyle = 'overview__section';
    let textStyle = 'overview__section--text';
    if (reversed) textStyle += ' overview__section--text-reversed';
    let totalKills = 0;
    team.forEach(match => {
      totalKills += match.kills;
    });

    return (
      <div className={sectionStyle}>
        <div className={textStyle}>Kills</div>
        <div className="overview__kills">{totalKills}</div>
      </div>
    );
  };

  const renderTeam = (team, reversed) => {
    let overviewStyle = 'overview__team';
    if (reversed) overviewStyle += ' overview__team--reversed';

    return (
      <div className={overviewStyle}>
        {renderBans(team, reversed)}
        {renderObjectives(team, reversed)}
        {renderKills(team, reversed)}
      </div>
    );
  };

  const renderWinner = team => {
    let winnerStyle = 'overview__winner';
    if (team.length) {
      const { win } = team[0];
      if (win) winnerStyle += ' overview__winner-red';
      else winnerStyle += ' overview__winner-blue';
    }

    return (
      <div className={winnerStyle}>
        <FaCrown />
      </div>
    );
  };

  return (
    <div className="overview__header">
      {renderTeam(blueTeam)}
      {renderWinner(blueTeam)}
      {renderTeam(redTeam)}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    items: getItems(state),
    champions: getChampions(state)
  };
};

export default connect(mapStateToProps, {})(OverviewHeader);
