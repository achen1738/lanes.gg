import React from 'react';
import './OverviewCell.scss';
import { connect } from 'react-redux';
import { getSummonerSpells, getRunes, getDDragon } from '../../selectors';
import { getUserMatch } from '../../../user/selectors';

const championImages = require.context('../../../../ddragon/img/champion', true);
const summonerImages = require.context('../../../../ddragon/img/spell', true);
const runeImages = require.context('../../../../ddragon/img/runes', true);
const images = require.context('../../../../img', true);
const itemImages = require.context('../../../../ddragon/img/item', true);

const OverviewCell = props => {
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const match = props.match;
  const champ = props.champions[match.championId];
  let champURI = champ.image.full;

  const {
    spell1Id,
    spell2Id,
    champLevel,
    kills,
    deaths,
    assists,
    totalMinionsKilled,
    neutralMinionsKilled,
    goldEarned,
    totalDamageDealtToChampions,
    visionWardsBoughtInGame
  } = match;
  const keystoneID = match.perk0;
  const secondaryID = match.perkSubStyle;

  // const level = user.stats.champLevel;
  let firstSpellURI = props.summonerSpells[spell1Id]._full;
  let secondSpellURI = props.summonerSpells[spell2Id]._full;
  let keystoneURI = props.runes[keystoneID].key + '.png';
  let secondaryURI = props.runes[secondaryID].icon;
  let items = [0, 1, 2, 6, 3, 4, 5];
  items = items.map(num => match[`item${num}`]);

  let cellStyle = 'overview__boxscore--cell';
  if (match.participantId === 1) {
    cellStyle += ' overview__boxscore--cell_user';
  }
  const csKilled = totalMinionsKilled + neutralMinionsKilled;
  return (
    <div className={cellStyle}>
      <div className="overview__boxscore--pictures">
        <div className="overview__boxscore--cell-champ">
          <img src={championImages(`./${champURI}`)} alt="champ" />
        </div>
        <div className="overview__boxscore--cell-summs">
          <img src={summonerImages(`./${firstSpellURI}`)} alt="summoner spell" />
          <img src={summonerImages(`./${secondSpellURI}`)} alt="summoner spell" />
          <img src={runeImages(`./${keystoneURI}`)} alt="champ" />
          <div className="overview__boxscore--cell-summs_secondary">
            <img src={images(`./${secondaryURI}`)} alt="champ" />
          </div>
          <div className="overview__boxscore--cell-level">{champLevel}</div>
        </div>
        <div className="overview__boxscore--cell-name">{match.summonerName}</div>
        <div className="overview__boxscore--cell-items">
          {items.map((item, index) => {
            if (item === 0 || item >= 3853) item = 3637;
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
        <div>{numberWithCommas(totalDamageDealtToChampions)}</div>
        <div>8</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    summonerSpells: getSummonerSpells(state),
    runes: getRunes(state),
    ddragon: getDDragon(state),
    userMatch: getUserMatch(state, props.gameId)
  };
};

export default connect(mapStateToProps, {})(OverviewCell);
