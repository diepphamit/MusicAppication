const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const GraphQLString = require('graphql').GraphQLString;

const UserType = require('../../types/user-type');
const User = require('../../../models/user');

exports.signin = {
  type: UserType.userTypeToken,
  args: {
    email: {
      type: GraphQLString,
    },
    password: {
        type: GraphQLString,
      }
  },
  async resolve(root, args) {
    const user = await User.findOne({ email: args.email });
    if(!user){
      throw new Error("Bad user");
    }
    
    const verify = await bcrypt.compare(args.password, user.password);
    if (!verify) {
      throw new Error("Bad password");
    }
    
    const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );

    return {
        token: token,
        email: user.email,
        id: user._id
    };
  }
}


