var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var queryType = require('./queries/user-query').queryType;

var queryType = require('./queries/index-query');

// exports.userSchema = new GraphQLSchema({
//   query: queryType,
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: mutation
//   })
// });

exports.songSchema = new GraphQLSchema({
    query: queryType.getAllUsers,
    // mutation: new GraphQLObjectType({
    //   name: 'Mutation',
    //   fields: mutation
    // })
  })