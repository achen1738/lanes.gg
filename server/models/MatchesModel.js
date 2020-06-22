/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('matches', {
    accountId: {
      type: DataTypes.STRING(56),
      allowNull: false,
      primaryKey: true
    },
    summonerName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gameId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    lane: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    participantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    championId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spell1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spell2Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    win: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    kills: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deaths: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assists: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visionScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstBloodAssist: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    firstBloodKill: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    goldEarned: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalDamageDealtToChampions: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalMinionsKilled: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    neutralMinionsKilled: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    neutralMinionsKilledTeamJungle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    neutralMinionsKilledEnemyJungle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wardsPlaced: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visionWardsBoughtInGame: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item4: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item5: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item6: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perk0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perk1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perk2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perk3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perk4: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perk5: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perkPrimaryStyle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perkSubStyle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statPerk0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statPerk1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statPerk2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'matches'
  });
};
