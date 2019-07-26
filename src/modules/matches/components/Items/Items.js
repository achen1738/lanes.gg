import React, { Component } from 'react';
import './Items.scss';
const itemImages = require.context('../../../../ddragon/img/item', true);

class Items extends Component {
  state = {};

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

  render() {
    return (
      <div className="match__items-container">
        <div className="match__items">
          {this.renderItems()}
          {this.renderControlWards()}
        </div>
      </div>
    );
  }
}

export default Items;
