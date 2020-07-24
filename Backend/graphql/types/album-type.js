var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;

// Album Type
exports.albumType = new GraphQLObjectType({
  name: 'album',
  fields: function () {
    return {
      id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      cover_small: {
        type: GraphQLString
      }
    }
  }
});
