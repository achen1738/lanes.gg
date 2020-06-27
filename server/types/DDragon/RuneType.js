const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

const RuneType = new GraphQLObjectType({
  name: 'RuneType',
  description: 'This represents a Rune like Aerys',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    icon: { type: GraphQLNonNull(GraphQLString) },
    key: { type: GraphQLNonNull(GraphQLString) }
  })
});

module.exports = RuneType;
