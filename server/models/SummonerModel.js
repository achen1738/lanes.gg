/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let summoner = sequelize.define(
    'summoner',
    {
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
        allowNull: false
      },
      updatedAtTS: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      id: {
        type: DataTypes.STRING(63),
        allowNull: false
      },
      puuid: {
        type: DataTypes.STRING(78),
        allowNull: false
      },
      summonerLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'summoner',
      uniqueKeys: {
        actions_unique: {
          fields: ['summonerName', 'puuid', 'id']
        }
      }
    }
  );
  return summoner;
};
