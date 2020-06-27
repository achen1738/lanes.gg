const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

const LeagueType = new GraphQLObjectType({
  name: 'League',
  description: 'This represents a league for a summoner',
  fields: () => ({
    summonerName: { type: GraphQLNonNull(GraphQLString) },
    summonerId: { type: GraphQLNonNull(GraphQLString) },
    queueType: { type: GraphQLNonNull(GraphQLString) },
    tier: { type: GraphQLString },
    division: { type: GraphQLString },
    leaguePoints: { type: GraphQLNonNull(GraphQLInt) },
    wins: { type: GraphQLNonNull(GraphQLInt) },
    losses: { type: GraphQLNonNull(GraphQLInt) },
    seriesWins: { type: GraphQLInt },
    seriesLosses: { type: GraphQLInt },
    seriesTarget: { type: GraphQLInt }
  })
});

module.exports = LeagueType;
