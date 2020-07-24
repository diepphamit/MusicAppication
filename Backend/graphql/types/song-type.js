var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var AlbumType = require('./album-type').albumType;
// Song Type
exports.songType = new GraphQLObjectType({
  name: 'song',
  fields: function () {
    return {
      id: {
        type: GraphQLID
      },
      title_short: {
        type: GraphQLString
      },
      preview: {
        type: GraphQLString
      },
      link: {
        type: GraphQLString
      },
      rank: {
        type: GraphQLInt
      },
      album: {
          type: AlbumType 
      }
    }
  }
});
