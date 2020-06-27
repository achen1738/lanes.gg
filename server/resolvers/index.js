const { SchemaComposer } = require('graphql-compose');
const schemaComposer = new SchemaComposer();
const { DDragonQueries, DDragonMutations } = require('./DDragon');
const { MySQLQueries, MySQLMutations } = require('./MySQL');

schemaComposer.Query.addFields({
  ...DDragonQueries,
  ...MySQLQueries
});

schemaComposer.Mutation.addFields({
  ...DDragonMutations,
  ...MySQLMutations
});

schemaComposer.Subscription.addFields({});

module.exports = schemaComposer.buildSchema();
