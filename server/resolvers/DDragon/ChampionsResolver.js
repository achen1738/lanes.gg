const { GraphQLList } = require('graphql');
const { ChampionType } = require('../../types');
const { getChampions } = require('../../dbFunctions');

const ChampionsQueries = {
  getChampions: {
    name: 'GetChampions',
    description: "Retrieves DDragon's champions list",
    type: GraphQLList(ChampionType),
    resolve: async (_, __) => {
      return await getChampions();
    }
  }
};
const ChampionsMutations = {};

module.exports = {
  ChampionsQueries,
  ChampionsMutations
};
