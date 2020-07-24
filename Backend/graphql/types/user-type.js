var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
const mongoose = require('mongoose');

// User Type
exports.userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    }
  }
});

exports.userTypeToken = new GraphQLObjectType({
    name: 'userToken',
    fields: function () {
        return {
            email: {
                type: GraphQLString
            },
            token: {
                type: GraphQLString
            }
        }
    }
});