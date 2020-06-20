const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const TimestampType = require('../GraphQLTimestamp.js');

const GameType = new GraphQLObjectType({
  name: 'Game',
  description: 'This represents the general information for a match',
  fields: () => ({
    gameId: { type: GraphQLNonNull(GraphQLInt) },
    queueId: { type: GraphQLNonNull(GraphQLInt) },
    gameDuration: { type: GraphQLNonNull(GraphQLInt) },
    seasonId: { type: GraphQLNonNull(GraphQLInt) },
    mapId: { type: GraphQLNonNull(GraphQLInt) },
    gameType: { type: GraphQLNonNull(GraphQLString) },
    platformId: { type: GraphQLNonNull(GraphQLString) },
    gameCreation: { type: TimestampType },
    gameVersion: { type: GraphQLNonNull(GraphQLString) },
    gameMode: { type: GraphQLNonNull(GraphQLString) },
    accountId: { type: GraphQLNonNull(GraphQLString) }
  })
});

module.exports = GameType;
