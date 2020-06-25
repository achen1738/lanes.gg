import './Champ.scss';
import React from 'react';

const runeImages = require.context('../../../../ddragon/img/runes', true);
const summonerImages = require.context('../../../../ddragon/img/spell', true);
const championImages = require.context('../../../../ddragon/img/champion', true);

const Champ = props => {
  const match = props.userMatch;

  /**
   * Renders the champion image
   */
  const renderChampion = () => {
    const championID = match.championId;
    let champURI = props.ddragon[championID].image.full;
    if (championID === 246) champURI = 'Qiyana.png';
    return (
      <div className="match__champ-image match__champ-image_main">
        <img src={championImages(`./${champURI}`)} alt="champion" />
      </div>
    );
  };

  /**
   * Renders the summoner spells as well as the level
   */
  const renderSummoners = () => {
    const { spell1Id, spell2Id, champLevel } = match;
    const keystoneID = match.perk0;
    // const level = user.stats.champLevel;
    let firstSpellURI = props.summonerSpells[spell1Id].image.full;
    let secondSpellURI = props.summonerSpells[spell2Id].image.full;
    let keystoneURI = props.runes[keystoneID].key + '.png';
    let styles = [
      'match__champ-image match__champ-image_secondary match__champ-image_secondary-left',
      'match__champ-image match__champ-image_secondary match__champ-image_secondary-right',
      'match__champ-image_tertiary'
    ];
    if (match.win) styles[2] += ' match__champ-image_secondary_win';
    else styles[2] += ' match__champ-image_secondary_lose';

    return (
      <div className="match__champ-image_secondary-container">
        <div className={styles[0]}>
          <img src={summonerImages(`./${firstSpellURI}`)} alt="summoner spell" />
        </div>
        <div className={styles[1]}>
          <img src={summonerImages(`./${secondSpellURI}`)} alt="summoner spell" />
        </div>
        <div className={styles[2]}>
          <img
            className="match__champ-keystone"
            src={runeImages(`./${keystoneURI}`)}
            alt="summoner spell"
          />
          <span className="match__champ-level">{champLevel}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="match__champ-container">
      <div className="match__champ">
        {renderChampion()}
        {renderSummoners()}
      </div>
    </div>
  );
};

export default Champ;
