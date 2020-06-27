const MySQLTypes = require('./MySQL');
const DDragonTypes = require('./DDragon');

module.exports = {
  ...MySQLTypes,
  ...DDragonTypes
};
