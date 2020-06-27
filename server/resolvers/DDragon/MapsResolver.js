const { GraphQLList } = require('graphql');
const { MapType } = require('../../types');
const { getMap } = require('../../dbFunctions');

const MapQueries = {
  getMaps: {
    name: 'GetMaps',
    description: 'Retrieves all maps',
    type: GraphQLList(MapType),

    resolve: async (_, __) => {
      return await getMaps();
    }
  }
};
const MapsMutations = {};

module.exports = {
  MapQueries,
  MapsMutations
};
