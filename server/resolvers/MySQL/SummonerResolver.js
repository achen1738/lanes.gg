const { getSummoner } = require('../../dbFunctions');
const { GraphQLString } = require('graphql');
const { SummonerType } = require('../../types');

const SummonerQueries = {
  summoner: {
    type: SummonerType,
    description: 'A single summoner',
    args: {
      summonerName: { type: GraphQLString }
    },
    resolve: async (_, { summonerName }) => {
      return await getSummoner(summonerName);
    }
  }
};

const SummonerMutations = {};

module.exports = {
  SummonerQueries,
  SummonerMutations
};
