const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} = require('graphql');

const GameType = new GraphQLObjectType({
  name: 'Game',
  description: 'This represents the general information for a game',
  fields: () => ({
    gameId: { type: GraphQLNonNull(GraphQLFloat) },
    queueId: { type: GraphQLNonNull(GraphQLInt) },
    gameDuration: { type: GraphQLNonNull(GraphQLInt) },
    seasonId: { type: GraphQLNonNull(GraphQLInt) },
    mapId: { type: GraphQLNonNull(GraphQLInt) },
    gameType: { type: GraphQLNonNull(GraphQLString) },
    platformId: { type: GraphQLNonNull(GraphQLString) },
    gameCreation: { type: GraphQLNonNull(GraphQLFloat) },
    gameVersion: { type: GraphQLNonNull(GraphQLString) },
    gameMode: { type: GraphQLNonNull(GraphQLString) }
  })
});

//

module.exports = GameType;
