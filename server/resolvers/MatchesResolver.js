const { getAllMatchesGame } = require('../dbFunctions');
const { GraphQLFloat, GraphQLList } = require('graphql');
const { MatchType } = require('../types');

const MatchesQueries = {
  getAllMatchesGame: {
    name: 'GameMatches',
    description: 'Retrieves all matches for a specific game',
    type: GraphQLList(MatchType),
    args: {
      gameId: { type: GraphQLFloat }
    },
    resolve: async (_, { gameId }) => {
      return await getAllMatchesGame(gameId);
    }
  }
};
const MatchesMutation = {};

module.exports = {
  MatchesQueries,
  MatchesMutation
};
