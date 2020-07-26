const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;

// Favorite Type
const favoriteType = new GraphQLObjectType({
  name: 'favorite',
  fields: {
    _id: {
        type: GraphQLString
    },
    song: {
        type: GraphQLString
    },
    user: {
        type: GraphQLString
    } 
  }
});

const favoriteSongType = new GraphQLObjectType({
    name: 'favoriteSong',
    fields: {
      _id: {
          type: GraphQLString
      },
      song: {
          type: GraphQLString
      },
      user: {
          type: GraphQLString
      }
    }
  });

const favoriteReturnType = new GraphQLObjectType({
  name: 'favoriteReturnSong',
  fields: {
    _id: {
        type: GraphQLString
    },
    song: {
        type: GraphQLString
    },
  }
});

const favoritePaginationType = new GraphQLObjectType({
  name: 'favoritePagination',
  fields: {
    total: {
        type: GraphQLInt
    },
    favariteSongs: {
        type: new GraphQLList(favoriteType)
    }
  }
});

module.exports = {
  favoriteType,
  favoriteSongType,
  favoriteReturnType,
  favoritePaginationType
}

