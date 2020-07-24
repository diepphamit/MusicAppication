const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var GraphQLString = require('graphql').GraphQLString;

var UserType = require('../../types/user-type');
var User = require('../../../models/user');

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
  async resolve(root, params) {
    const user = await User.findOne({ email: params.email });
    if(!user){
      throw new Error("Bad user");
    }
        
    const verify = await bcrypt.compare(params.password, user.password);
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
        email: user.email
    };
  }
}


