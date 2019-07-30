import React, { Component } from 'react';
import './Overview.scss';
import { connect } from 'react-redux';
import { getMatch, getDDragon, getSummoner, getRunes, getItems } from '../../selectors';
import { FiX } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

import { IconBaron, IconDragon, IconTower } from '../../../../icons/icons';
const championImages = require.context('../../../../ddragon/img/champion', true);
const summonerImages = require.context('../../../../ddragon/img/spell', true);
const runeImages = require.context('../../../../ddragon/img/runes', true);
const images = require.context('../../../../img', true);
const itemImages = require.context('../../../../ddragon/img/item', true);

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

  renderItems = () => {
    const user = this.props.game.participants[this.props.userIndex];
    let items = [];
    for (let i = 0; i < 7; i++) {
      items.push(user.stats[`item${i}`]);
    }

    let itemStyle = 'match__items-item';
    if (this.props.win) itemStyle += ' match__items-item_win';
    else itemStyle += ' match__items-item_lose';
    return items.map((item, index) => {
      if (item === 0) item = 3637;
      return <img key={index} alt="item" className={itemStyle} src={itemImages(`./${item}.png`)} />;
    });
  };

  renderControlWards = () => {
    const user = this.props.game.participants[this.props.userIndex];
    let itemStyle = 'match__items-item';
    if (this.props.win) itemStyle += ' match__items-item_win';
    else itemStyle += ' match__items-item_lose';

    return (
      <div className="match__items-ward">
        <img key={7} alt="control ward" className={itemStyle} src={itemImages(`./2055.png`)} />
        <div className="match__items-ward-count">{user.stats.visionWardsBoughtInGame}</div>
      </div>
    );
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  renderCells = arr => {
    const participants = this.props.match.participants;
    return arr.map(num => {
      const participant = participants[num];
      const champ = this.props.ddragon[participant.championId];
      let champURI = champ.image.full;

      const { spell1Id, spell2Id } = participant;
      const champLevel = participant.stats.champLevel;
      const keystoneID = participant.stats.perk0;
      const secondaryID = participant.stats.perkSubStyle;

      // const level = user.stats.champLevel;
      let firstSpellURI = this.props.summoner[spell1Id].image.full;
      let secondSpellURI = this.props.summoner[spell2Id].image.full;
      let keystoneURI = this.props.runes[keystoneID].key + '.png';
      let secondaryURI = this.props.runes[secondaryID].icon;
      console.log(this.props.runes);
      let items = [0, 1, 2, 6, 3, 4, 5];
      items = items.map(num => participant.stats[`item${num}`]);

      const stats = participant.stats;
      const {
        kills,
        deaths,
        assists,
        totalMinionsKilled,
        neutralMinionsKilled,
        goldEarned,
        totalDamageDealtToChampions
      } = stats;
      const csKilled = totalMinionsKilled + neutralMinionsKilled;
      return (
        <div className="overview__boxscore--cell">
          <div className="overview__boxscore--pictures">
            <div className="overview__boxscore--cell-champ">
              <img src={championImages(`./${champURI}`)} alt="champ" />
            </div>
            <div className="overview__boxscore--cell-summs">
              <img src={summonerImages(`./${firstSpellURI}`)} alt="summoner spell" />
              <img src={summonerImages(`./${secondSpellURI}`)} alt="summoner spell" />
              <img src={runeImages(`./${keystoneURI}`)} alt="champ" />
              <img src={images(`./${secondaryURI}`)} alt="champ" />
              <div className="overview__boxscore--cell-level">18</div>
            </div>
            <div className="overview__boxscore--cell-name">me minh nguyen</div>
            <div className="overview__boxscore--cell-items">
              {items.map((item, index) => {
                if (item === 0) item = 3637;
                return <img key={index} alt="item" src={itemImages(`./${item}.png`)} />;
              })}
              <img key={7} alt="control ward" src={itemImages(`./2055.png`)} />
            </div>
          </div>
          <div className="overview__boxscore--stats">
            <div>
              <span className="match__stats-number">{kills}</span>
              <span className="match__stats-separator">/</span>
              <span className="match__stats-number">{deaths}</span>
              <span className="match__stats-separator">/</span>
              <span className="match__stats-number">{assists}</span>
            </div>
            <div>{csKilled}</div>
            <div>{(goldEarned / 1000).toFixed(1) + 'k'}</div>
            <div>{this.numberWithCommas(totalDamageDealtToChampions)}</div>
            <div>8</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="overview">
        <div className="overview__header">
          {this.renderTeam(0)}
          {this.renderWinner()}
          {this.renderTeam(1)}
        </div>
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
          <div className="overview__boxscore--group">{this.renderCells([0, 1, 2, 3, 4])}</div>
          <div className="overview__boxscore--group">{this.renderCells([5, 6, 7, 8, 9])}</div>
        </div>
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
