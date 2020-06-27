const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

const SummonerSpellType = new GraphQLObjectType({
  name: 'SummonerSpellType',
  description: 'This represents a summoner spell like Flash',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    _key: { type: GraphQLNonNull(GraphQLInt) },
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

module.exports = SummonerSpellType;
