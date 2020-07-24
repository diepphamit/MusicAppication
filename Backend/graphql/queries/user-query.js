var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var User = require('../../models/user');
 var userType = require('../types/user-type').userType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        async resolve() {
            const users = await User.find().exec(); 
            if(!users) {
                throw new Error('Error');
            }
            
            return users;
        }
      }
    }
    
  }
});