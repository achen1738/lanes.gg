const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

const SummonerSpellType = new GraphQLObjectType({
  name: 'SummonerSpellType',
  description: 'This represents a summoner spell like Flash',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
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

module.exports = SummonerSpellType;
