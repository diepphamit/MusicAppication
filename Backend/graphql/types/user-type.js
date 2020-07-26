const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLInt = require('graphql').GraphQLInt;

const FavoriteType = require('./favorite-type').favoriteType;


// User Type
const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    _id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    favorites: {
      type: new GraphQLList(FavoriteType)
    }
  }
  
});

const userTypeToken = new GraphQLObjectType({
    name: 'userToken',
    fields:{
      email: {
          type: GraphQLString
      },
      token: {
          type: GraphQLString
      },
      _id: {
        type: GraphQLString
      }     
    }
});

const userPaginationType = new GraphQLObjectType({
  name: 'userPaginationType',
  fields:{
    total: {
        type: GraphQLInt
    },
    users: {
        type: new GraphQLList(userType)
    },    
  }
});

module.exports = {
  userType,
  userTypeToken,
  userPaginationType
}