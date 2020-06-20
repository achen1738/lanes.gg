const { TimestampType } = require('../GraphQLTimestamp.js');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const MatchType = require('./MatchType');
const { getSummonerMatches, getAllMatches } = require('../dbFunctions');

const SummonerType = new GraphQLObjectType({
  name: 'Summoner',
  description: 'This represents a Summoner',
  fields: () => ({
    accountId: { type: GraphQLNonNull(GraphQLString) },
    profileIconId: { type: GraphQLNonNull(GraphQLInt) },
    summonerName: { type: GraphQLNonNull(GraphQLString) },
    updatedAtTS: { type: TimestampType },
    id: { type: GraphQLNonNull(GraphQLString) },
    puuid: { type: GraphQLNonNull(GraphQLString) },
    summonerLevel: { type: GraphQLNonNull(GraphQLInt) },
    onlyUserMatches: {
      name: "Summoner's MatchTypes",
      type: GraphQLList(MatchType),
      args: {
        limit: { type: GraphQLInt }
      },
      description: "Retrieves the summoner's last 'limit' games",
      resolve: async (summoner, { limit }) => {
        return await getSummonerMatches(summoner.accountId, limit);
      }
    },
    allGameMatches: {
      name: 'A list of all matches per gameId',
      // type: GraphQLList(
      //   new GraphQLObjectType({
      //     gameId: { type: GraphQLInt },
      //     matches: GraphQLList(MatchType)
      //   })
      // ),
      type: GraphQLList(MatchType),
      args: {
        limit: { type: GraphQLInt }
      },
      description: "Retrieves all matches for the summoner's last 'limit' games",
      resolve: async (summoner, { limit }) => {
        return await getAllMatches(summoner.accountId, limit);
      }
    }
  })
});

module.exports = SummonerType;
