/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leagues', {
    summonerName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    summonerId: {
      type: DataTypes.STRING(63),
      allowNull: false
    },
    queueType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    tier: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    division: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    leaguePoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    seriesWins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    seriesLosses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    seriesTarget: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'leagues'
  });
};
