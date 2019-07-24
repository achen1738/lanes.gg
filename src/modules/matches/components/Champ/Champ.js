import React, { Component } from 'react';
import './Champ.scss';
const championImages = require.context('../../../../ddragon/img/champion', true);
const summonerImages = require.context('../../../../ddragon/img/spell', true);
const runeImages = require.context('../../../../ddragon/img/runes', true);

class Champ extends Component {
  state = {};

  /**
   * Renders the champion image
   */
  renderChampion = () => {
    const user = this.props.game.participants[this.props.userIndex];
    const championID = user.championId;
    const champURI = this.props.ddragon[championID].image.full;

    return (
      <div className="match__champ-image match__champ-image_main">
        <img src={championImages(`./${champURI}`)} alt="champion" />
      </div>
    );
  };

  /**
   * Renders the summoner spells as well as the level
   */
  renderSummoners = () => {
    const user = this.props.game.participants[this.props.userIndex];
    const { spell1Id, spell2Id } = user;
    const keystoneID = user.stats.perk0;
    // const level = user.stats.champLevel;
    let firstSpellURI = this.props.summoner[spell1Id].image.full;
    let secondSpellURI = this.props.summoner[spell2Id].image.full;
    let keystoneURI = this.props.runes[keystoneID].key + '.png';
    let styles = [
      'match__champ-image match__champ-image_secondary match__champ-image_secondary-left',
      'match__champ-image match__champ-image_secondary match__champ-image_secondary-right',
      'match__champ-image match__champ-image_secondary match__champ-image_secondary-mid'
    ];
    if (this.props.win) styles[2] += ' match__champ-image_secondary_win';
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
          <img src={runeImages(`./${keystoneURI}`)} alt="summoner spell" />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="match__champ">
        {this.renderChampion()}
        {this.renderSummoners()}
      </div>
    );
  }
}

export default Champ;
