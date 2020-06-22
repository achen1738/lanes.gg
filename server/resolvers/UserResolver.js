const { SummonerType, GameType, MatchType, LeagueType } = require('../types');
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { updateUser } = require('../dbFunctions');

const UpdateType = new GraphQLObjectType({
  name: 'ReturnedUpdate',
  description: 'This represents an returned update object',
  fields: () => ({
    summoner: { type: SummonerType },
    leagues: { type: GraphQLList(LeagueType) },
    matches: { type: GraphQLList(MatchType) },
    games: { type: GraphQLList(GameType) }
  })
});

const UserQueries = {};
const UserMutations = {
  updateSummoner: {
    type: UpdateType,
    args: {
      summonerName: { type: GraphQLString }
    },
    resolve: async (_, { summonerName }) => {
      return await updateUser(summonerName);
    }
  }
};
//
module.exports = {
  UserQueries,
  UserMutations
};
