import React, { Component } from 'react';
import './Overview.scss';
import { connect } from 'react-redux';
import { getMatch, getDDragon, getSummoner, getRunes, getItems } from '../../selectors';
import { FiX } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

import { IconBaron, IconDragon, IconTower } from '../../../../icons/icons';
const championImages = require.context('../../../../ddragon/img/champion', true);

class Overview extends Component {
  state = {};

  renderBans = team => {
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
      const champ = this.props.ddragon[championID];
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

  renderObjectives = team => {
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

  renderKills = team => {
    let start = team.bans[0].pickTurn - 1;
    let end = team.bans[4].pickTurn - 1;
    let sectionStyle = 'overview__section';
    let textStyle = 'overview__section--text';
    if (team.bans[0].pickTurn !== 1) textStyle += ' overview__section--text-reversed';
    const participants = this.props.match.participants;
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

  renderTeam = teamIndex => {
    const team = this.props.match.teams[teamIndex];
    let overviewStyle = 'overview__team';
    if (teamIndex) overviewStyle += ' overview__team--reversed';

    return (
      <div className={overviewStyle}>
        {this.renderBans(team)}
        {this.renderObjectives(team)}
        {this.renderKills(team)}
      </div>
    );
  };

  renderWinner = () => {
    const team = this.props.match.teams[0];
    let winnerStyle = 'overview__winner';
    if (team.win === 'Fail') winnerStyle += ' overview__winner-red';
    else winnerStyle += ' overview__winner-blue';
    return (
      <div className={winnerStyle}>
        <FaCrown />
      </div>
    );
  };

  render() {
    return (
      <div className="overview">
        <div className="overview__header">
          {this.renderTeam(0)}
          {this.renderWinner()}
          {this.renderTeam(1)}
        </div>
        <div className="overview__boxscore"></div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    match: getMatch(state, props.matchIndex),
    ddragon: getDDragon(state),
    summoner: getSummoner(state),
    runes: getRunes(state),
    items: getItems(state)
  };
};

export default connect(
  mapStateToProps,
  {}
)(Overview);
