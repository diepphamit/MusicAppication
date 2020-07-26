const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;

const mutation = require('./matutions/index-matution');
const query = require('./queries/query-schema');


exports.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: query
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutation
    })
  })