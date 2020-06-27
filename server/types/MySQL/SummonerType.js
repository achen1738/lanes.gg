const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat
} = require('graphql');
const MatchType = require('./MatchType');
const LeagueType = require('./LeagueType');
const GameType = require('./GameType.js');

const {
  getSummonerMatches,
  getAllDisplayMatches,
  getLeagues,
  getGames
} = require('../../dbFunctions');

const SummonerType = new GraphQLObjectType({
  name: 'Summoner',
  description: 'This represents a Summoner',
  fields: () => ({
    accountId: { type: GraphQLNonNull(GraphQLString) },
    profileIconId: { type: GraphQLNonNull(GraphQLInt) },
    summonerName: { type: GraphQLNonNull(GraphQLString) },
    updatedAtTS: { type: GraphQLNonNull(GraphQLFloat) },
    id: { type: GraphQLNonNull(GraphQLString) },
    puuid: { type: GraphQLNonNull(GraphQLString) },
    summonerLevel: { type: GraphQLNonNull(GraphQLInt) },
    getUserMatches: {
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
    getDisplayMatches: {
      name: 'A list of all matches per gameId for display, not analysis',
      type: GraphQLList(MatchType),
      args: {
        limit: { type: GraphQLInt }
      },
      description: "Retrieves all matches for the summoner's last 'limit' games",
      resolve: async (summoner, { limit }) => {
        return await getAllDisplayMatches(summoner.accountId, limit);
      }
    },
    getLeagues: {
      name: 'A list of leagues',
      type: GraphQLList(LeagueType),
      description: 'Retrieves all leagues the summoner is in',
      resolve: async (summoner, _) => {
        return await getLeagues(summoner.id);
      }
    },
    getGames: {
      name: 'A list of games',
      type: GraphQLList(GameType),
      args: {
        limit: { type: GraphQLInt }
      },
      description: "Retrieves the summoner's latest 'limit' games",
      resolve: async (summoner, { limit }) => {
        return await getGames(summoner.accountId, limit);
      }
    }
  })
});

module.exports = SummonerType;
