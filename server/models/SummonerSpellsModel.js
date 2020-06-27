/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'summonerspells',
    {
      id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true
      },
      _key: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
      },
      _full: {
        type: DataTypes.STRING(16),
        allowNull: false
      },
      sprite: {
        type: DataTypes.STRING(16),
        allowNull: false
      },
      _group: {
        type: DataTypes.STRING(16),
        allowNull: false
      },
      x: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      y: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      w: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      h: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'summonerspells'
    }
  );
};
