const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLString = require('graphql').GraphQLString;

// Album Type
const albumType = new GraphQLObjectType({
  name: 'album',
  fields: {
    id: {
      type: GraphQLID
    },
    albumId: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    cover_small: {
      type: GraphQLString
    },
    cover_medium: {
      type: GraphQLString
    }
  }
});

const albumPaginationType = new GraphQLObjectType({
  name: 'albumPaginationType',
  fields: {
    total: {
      type: GraphQLInt
    },
    albums: {
      type: new GraphQLList(albumType)
    }
  }
});

module.exports = {
  albumType,
  albumPaginationType
}
