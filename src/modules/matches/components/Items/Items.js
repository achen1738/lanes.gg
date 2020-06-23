import React from 'react';
import './Items.scss';
const itemImages = require.context('../../../../ddragon/img/item', true);

const Items = props => {
  const renderItems = () => {
    const user = props.game.participants[props.userIndex];
    let items = [0, 1, 2, 6, 3, 4, 5].map(num => {
      return user.stats[`item${num}`];
    });

    let itemStyle = 'match__items-item';
    if (props.win) itemStyle += ' match__items-item_win';
    else itemStyle += ' match__items-item_lose';
    return items.map((item, index) => {
      if (item === 0) item = 3637;
      return <img key={index} alt="item" className={itemStyle} src={itemImages(`./${item}.png`)} />;
    });
  };

  const renderControlWards = () => {
    const user = props.game.participants[props.userIndex];
    let itemStyle = 'match__items-item';
    if (props.win) itemStyle += ' match__items-item_win';
    else itemStyle += ' match__items-item_lose';

    return (
      <div className="match__items-ward">
        <img key={7} alt="control ward" className={itemStyle} src={itemImages(`./2055.png`)} />
        <div className="match__items-ward-count">{user.stats.visionWardsBoughtInGame}</div>
      </div>
    );
  };

  return (
    <div className="match__items-container">
      <div className="match__items">
        {renderItems()}
        {renderControlWards()}
      </div>
    </div>
  );
};

export default Items;
