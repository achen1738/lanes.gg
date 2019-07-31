import React, { Component } from 'react';
import './OverviewCell.scss';
const championImages = require.context('../../../../ddragon/img/champion', true);
const summonerImages = require.context('../../../../ddragon/img/spell', true);
const runeImages = require.context('../../../../ddragon/img/runes', true);
const images = require.context('../../../../img', true);
const itemImages = require.context('../../../../ddragon/img/item', true);

class OverviewCell extends Component {
  state = {};

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  render() {
    const participant = this.props.participant;
    const identity = this.props.identity;
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
      totalDamageDealtToChampions,
      visionWardsBoughtInGame
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
          <div className="overview__boxscore--cell-name">{identity.player.summonerName}</div>
          <div className="overview__boxscore--cell-items">
            {items.map((item, index) => {
              if (item === 0) item = 3637;
              return <img key={index} alt="item" src={itemImages(`./${item}.png`)} />;
            })}
            <div className="overview__boxscore--cell-item">
              <img key={7} alt="control ward" src={itemImages(`./2055.png`)} />
              <div className="overview__boxscore--cell-item_ward">{visionWardsBoughtInGame}</div>
            </div>
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
  }
}

export default OverviewCell;
