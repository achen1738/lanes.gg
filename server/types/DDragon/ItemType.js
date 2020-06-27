const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

const ItemType = new GraphQLObjectType({
  name: 'ItemType',
  description: 'This represents an item like Boots of Speed',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    _full: { type: GraphQLNonNull(GraphQLString) },
    sprite: { type: GraphQLNonNull(GraphQLString) },
    _group: { type: GraphQLNonNull(GraphQLString) },
    x: { type: GraphQLNonNull(GraphQLInt) },
    y: { type: GraphQLNonNull(GraphQLInt) },
    w: { type: GraphQLNonNull(GraphQLInt) },
    h: { type: GraphQLNonNull(GraphQLInt) }
  })
});

module.exports = ItemType;
