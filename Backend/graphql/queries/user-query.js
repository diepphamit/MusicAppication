const GraphQLInt = require('graphql').GraphQLInt;

const UserPaginationType = require('../types/user-type').userPaginationType;
const User = require('../../models/user');

exports.getAllUsers = {
        type: UserPaginationType,
        args: {
            take: {
                type: GraphQLInt
            },
            skip: {
                type: GraphQLInt
            }
        },
        async resolve(root, args) {
            const users = await User.find(); 
            if(!users) {
                throw new Error('Error');
            }
            
            return {
                users: users.slice(args.take*args.skip,args.take*args.skip + args.take),
                total: users.length
            };
        }   
}
