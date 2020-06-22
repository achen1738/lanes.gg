/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('summoner', {
    accountId: {
      type: DataTypes.STRING(56),
      allowNull: false,
      primaryKey: true
    },
    profileIconId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    summonerName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    updatedAtTS: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    id: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true
    },
    puuid: {
      type: DataTypes.STRING(78),
      allowNull: false,
      unique: true
    },
    summonerLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'summoner'
  });
};
