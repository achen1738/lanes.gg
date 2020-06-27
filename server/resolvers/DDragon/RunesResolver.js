const { GraphQLList } = require('graphql');
const { RuneType } = require('../../types');
const { getRunes } = require('../../dbFunctions');

const RunesQueries = {
  getRunes: {
    name: 'GetRunes',
    description: "Retrieves DDragon's list of runes reforged",
    type: GraphQLList(RuneType),

    resolve: async (_, __) => {
      return await getRunes();
    }
  }
};

const RunesMutations = {};

module.exports = {
  RunesQueries,
  RunesMutations
};
