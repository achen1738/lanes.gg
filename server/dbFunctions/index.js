const gameFunctions = require('./GameFunctions');
const matchFunctions = require('./MatchFunctions');
const summonerFunctions = require('./SummonerFunctions');
const userFunctions = require('./UserFunctions.js');
const leagueFunctions = require('./LeagueFunctions.js');

module.exports = {
  ...gameFunctions,
  ...matchFunctions,
  ...summonerFunctions,
  ...userFunctions,
  ...leagueFunctions
};
