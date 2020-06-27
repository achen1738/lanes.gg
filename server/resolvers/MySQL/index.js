const { GamesQueries, GamesMutations } = require('./GamesResolver');
const { MatchesQueries, MatchesMutations } = require('./MatchesResolver');
const { UserQueries, UserMutations } = require('./UserResolver');
const { SummonerQueries, SummonerMutations } = require('./SummonerResolver');

const MySQLQueries = {
  ...GamesQueries,
  ...MatchesQueries,
  ...UserQueries,
  ...SummonerQueries
};

const MySQLMutations = {
  ...GamesMutations,
  ...MatchesMutations,
  ...UserMutations,
  ...SummonerMutations
};

module.exports = { MySQLQueries, MySQLMutations };
