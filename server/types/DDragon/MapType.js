const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

const MapType = new GraphQLObjectType({
  name: 'MapType',
  description: 'This represents amap like Howling Abyss',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    full: { type: GraphQLNonNull(GraphQLString) },
    sprite: { type: GraphQLNonNull(GraphQLString) },
    group: { type: GraphQLNonNull(GraphQLString) },
    x: { type: GraphQLNonNull(GraphQLInt) },
    y: { type: GraphQLNonNull(GraphQLInt) },
    w: { type: GraphQLNonNull(GraphQLInt) },
    h: { type: GraphQLNonNull(GraphQLInt) }
  })
});

module.exports = MapType;
