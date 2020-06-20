const { GamesQueries, GamesMutations } = require('./GamesResolver');
const { MatchesQueries, MatchesMutations } = require('./MatchesResolver');
const { UserQueries, UserMutations } = require('./UserResolver');
const { SummonerQueries, SummonerMutations } = require('./SummonerResolver');

const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...GamesQueries,
  ...MatchesQueries,
  ...UserQueries,
  ...SummonerQueries
});

schemaComposer.Mutation.addFields({
  ...GamesMutations,
  ...MatchesMutations,
  ...UserMutations,
  ...SummonerMutations
});

schemaComposer.Subscription.addFields({});

module.exports = schemaComposer.buildSchema();
