import React from 'react';
import './Players.scss';
const championImages = require.context('../../../../ddragon/img/champion', true);

const Players = props => {
  const renderTeam = offset => {
    const participants = props.game.participants;
    const identities = props.game.participantIdentities;
    let players = [];
    for (let i = 0 + offset; i < 5 + offset; i++) {
      players.push({
        isUser: i === props.userIndex,
        name: identities[i].player.summonerName,
        champID: participants[i].championId
      });
    }
    return players.map((player, index) => {
      const champ = props.ddragon[player.champID];
      let champURI = champ.image.full;
      let textStyle = 'match__players-text';
      if (player.isUser) textStyle += ' match__players-text_user';

      return (
        <div key={index} className="match__players-player">
          <img
            className="match__players-image"
            alt="champion"
            src={championImages(`./${champURI}`)}
          />
          <div className={textStyle}>{`${player.name}`}</div>
        </div>
      );
    });
  };

  return (
    <div className="match__players-container">
      <div className="match__players">
        <div className="match__players-group">{renderTeam(0)}</div>
        <div className="match__players-group">{renderTeam(5)}</div>
      </div>
    </div>
  );
};

export default Players;
