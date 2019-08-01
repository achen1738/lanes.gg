import React from 'react';
import { FiX } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { IconBaron, IconDragon, IconTower } from '../../../../icons/icons';
import './OverviewHeader.scss';
const championImages = require.context('../../../../ddragon/img/champion', true);

const OverviewHeader = props => {
  const renderBans = team => {
    let sectionStyle = 'overview__section';
    if (team.bans[0].pickTurn !== 1) sectionStyle += ' overview__section--reversed';

    let textStyle = 'overview__section--text';
    if (team.bans[0].pickTurn !== 1) textStyle += ' overview__section--text-reversed';
    const bans = team.bans.map((ban, index) => {
      let championID = ban.championId;
      if (championID === -1) {
        return (
          <div className="overview__image--ban">
            <FiX />
          </div>
        );
      }
      const champ = props.ddragon[championID];
      let champURI = champ.image.full;

      return (
        <img
          className="overview__image--ban"
          src={championImages(`./${champURI}`)}
          alt="champ banned"
          key={index}
        />
      );
    });

    return (
      <div className={sectionStyle}>
        <div className={textStyle}>Bans</div>
        <div className="overview__bans">{bans}</div>
      </div>
    );
  };

  const renderObjectives = team => {
    let iconStyle = 'icon--objective';
    if (team.bans[0].pickTurn === 1) iconStyle += ' icon--objective-blue';
    else iconStyle += ' icon--objective-red';

    let sectionStyle = 'overview__section';
    if (team.bans[0].pickTurn !== 1) sectionStyle += ' overview__section--reversed';

    let textStyle = 'overview__section--text';
    if (team.bans[0].pickTurn !== 1) textStyle += ' overview__section--text-reversed';
    return (
      <div className={sectionStyle}>
        <div className={textStyle + ' overview__section--objectives'}>Objectives</div>
        <div className="overview__objectives">
          <IconTower className={iconStyle} />
          <span>{team.towerKills}</span>
          <IconBaron className={iconStyle} />
          <span>{team.baronKills}</span>
          <IconDragon className={iconStyle} />
          <span>{team.dragonKills}</span>
        </div>
      </div>
    );
  };

  const renderKills = team => {
    let start = team.bans[0].pickTurn - 1;
    let end = team.bans[4].pickTurn - 1;
    let sectionStyle = 'overview__section';
    let textStyle = 'overview__section--text';
    if (team.bans[0].pickTurn !== 1) textStyle += ' overview__section--text-reversed';
    const participants = props.match.participants;
    let totalKills = 0;
    for (let i = start; i <= end; i++) {
      totalKills += participants[i].stats.kills;
    }

    return (
      <div className={sectionStyle}>
        <div className={textStyle}>Kills</div>
        <div className="overview__kills">{totalKills}</div>
      </div>
    );
  };

  const renderTeam = teamIndex => {
    const team = props.match.teams[teamIndex];
    let overviewStyle = 'overview__team';
    if (teamIndex) overviewStyle += ' overview__team--reversed';

    return (
      <div className={overviewStyle}>
        {renderBans(team)}
        {renderObjectives(team)}
        {renderKills(team)}
      </div>
    );
  };

  const renderWinner = () => {
    const team = props.match.teams[0];
    let winnerStyle = 'overview__winner';
    if (team.win === 'Fail') winnerStyle += ' overview__winner-red';
    else winnerStyle += ' overview__winner-blue';
    return (
      <div className={winnerStyle}>
        <FaCrown />
      </div>
    );
  };

  return (
    <div className="overview__header">
      {renderTeam(0)}
      {renderWinner()}
      {renderTeam(1)}
    </div>
  );
};

export default OverviewHeader;
