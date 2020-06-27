/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('runes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    _key: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'runes'
  });
};
