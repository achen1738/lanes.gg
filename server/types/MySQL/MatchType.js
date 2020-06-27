const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} = require('graphql');

const MatchType = new GraphQLObjectType({
  name: 'Match',
  description: 'This represents the match results for a summoner',
  fields: () => ({
    accountId: { type: GraphQLNonNull(GraphQLString) },
    summonerName: { type: GraphQLNonNull(GraphQLString) },
    gameId: { type: GraphQLNonNull(GraphQLFloat) },
    participantId: { type: GraphQLNonNull(GraphQLInt) },
    championId: { type: GraphQLNonNull(GraphQLInt) },
    teamId: { type: GraphQLNonNull(GraphQLInt) },
    spell1Id: { type: GraphQLNonNull(GraphQLInt) },
    spell2Id: { type: GraphQLNonNull(GraphQLInt) },
    win: { type: GraphQLNonNull(GraphQLInt) },
    kills: { type: GraphQLNonNull(GraphQLInt) },
    deaths: { type: GraphQLNonNull(GraphQLInt) },
    assists: { type: GraphQLNonNull(GraphQLInt) },
    visionScore: { type: GraphQLNonNull(GraphQLInt) },
    firstBloodAssist: { type: GraphQLNonNull(GraphQLInt) },
    firstBloodKill: { type: GraphQLNonNull(GraphQLInt) },
    goldEarned: { type: GraphQLNonNull(GraphQLInt) },
    totalDamageDealtToChampions: { type: GraphQLNonNull(GraphQLInt) },
    totalMinionsKilled: { type: GraphQLNonNull(GraphQLInt) },
    neutralMinionsKilled: { type: GraphQLNonNull(GraphQLInt) },
    neutralMinionsKilledTeamJungle: { type: GraphQLNonNull(GraphQLInt) },
    neutralMinionsKilledEnemyJungle: { type: GraphQLNonNull(GraphQLInt) },
    wardsPlaced: { type: GraphQLNonNull(GraphQLInt) },
    visionWardsBoughtInGame: { type: GraphQLNonNull(GraphQLInt) },
    item0: { type: GraphQLNonNull(GraphQLInt) },
    item1: { type: GraphQLNonNull(GraphQLInt) },
    item2: { type: GraphQLNonNull(GraphQLInt) },
    item3: { type: GraphQLNonNull(GraphQLInt) },
    item4: { type: GraphQLNonNull(GraphQLInt) },
    item5: { type: GraphQLNonNull(GraphQLInt) },
    item6: { type: GraphQLNonNull(GraphQLInt) },
    perk0: { type: GraphQLNonNull(GraphQLInt) },
    perk1: { type: GraphQLNonNull(GraphQLInt) },
    perk2: { type: GraphQLNonNull(GraphQLInt) },
    perk3: { type: GraphQLNonNull(GraphQLInt) },
    perk4: { type: GraphQLNonNull(GraphQLInt) },
    perk5: { type: GraphQLNonNull(GraphQLInt) },
    perkPrimaryStyle: { type: GraphQLNonNull(GraphQLInt) },
    perkSubStyle: { type: GraphQLNonNull(GraphQLInt) },
    statPerk0: { type: GraphQLNonNull(GraphQLInt) },
    statPerk1: { type: GraphQLNonNull(GraphQLInt) },
    statPerk2: { type: GraphQLNonNull(GraphQLInt) }
  })
});

module.exports = MatchType;
