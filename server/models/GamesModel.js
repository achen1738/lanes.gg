/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('games', {
    gameId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    queueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gameDuration: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    seasonId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mapId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gameType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    platformId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gameVersion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gameMode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gameCreation: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'games'
  });
};
