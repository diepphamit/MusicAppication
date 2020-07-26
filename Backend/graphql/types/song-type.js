const GraphQLList = require('graphql').GraphQLList;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;

const AlbumType = require('./album-type').albumType;

// Song Type
const songType = new GraphQLObjectType({
  name: 'song',
  fields: {
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
});


const songDBType = new GraphQLObjectType({
  name: 'songDB',
  fields: {
    _id: {
      type: GraphQLString
    },
    songId: {
      type: GraphQLInt
    }
  }
});


const songPaginationType = new GraphQLObjectType({
  name: 'songPaginationType',
  fields: {
    total: {
      type: GraphQLInt
    },
    songs: {
      type: new GraphQLList(songType)
    }
  }
});

const songPaginationDBType = new GraphQLObjectType({
  name: 'songPaginationDBType',
  fields: {
    total: {
      type: GraphQLInt
    },
    songs: {
      type: new GraphQLList(songDBType)
    }
  }
});

module.exports = {
  songType,
  songDBType,
  songPaginationType,
  songPaginationDBType
}