const { GraphQLList } = require('graphql');
const { ItemType } = require('../../types');
const { getItems } = require('../../dbFunctions');

const ItemsQueries = {
  getItems: {
    name: 'GetItems',
    description: "Retrieves DDragon's items list",
    type: GraphQLList(ItemType),

    resolve: async (_, __) => {
      return await getItems();
    }
  }
};
const ItemsMutations = {};

module.exports = {
  ItemsQueries,
  ItemsMutations
};
