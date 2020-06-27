const { GraphQLList } = require('graphql');
const { getSummonerSpells } = require('../../dbFunctions');
const { SummonerSpellType } = require('../../types');

const SummonerSpellsQueries = {
  getSummonerSpells: {
    name: 'GameMatches',
    description: "Gets DDragon's list of Summoner Spells",
    type: GraphQLList(SummonerSpellType),

    resolve: async (_, __) => {
      return await getSummonerSpells();
    }
  }
};
const SummonerSpellsMutations = {};

module.exports = {
  SummonerSpellsQueries,
  SummonerSpellsMutations
};
