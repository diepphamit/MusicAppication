const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const GraphQLString = require('graphql').GraphQLString;

const UserType = require('../../types/user-type');
const User = require('../../../models/user');

exports.signup = {
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
    if(user){
      throw new Error("User existed");
    }

    var hash = await bcrypt.hash(params.password, 10);
    if(hash) {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: params.email,
        password: hash
      });

      const result = await user.save();
      if(result) {
        const token = jwt.sign(
          {
            email: result.email,
            userId: result._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
        );

        return {
          token: token,
          email: result.email,
          id: result._id
        };
      }
    }

    return Error('Error');
  }
}