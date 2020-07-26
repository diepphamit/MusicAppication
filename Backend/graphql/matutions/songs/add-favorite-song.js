const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;

const FavariteType = require('../../types/favorite-type').favoriteType;
const Favorite = require('../../../models/favorite');
const User = require('../../../models/user');
const Song = require('../../../models/song');

exports.addFavoriteSong = {
  type: FavariteType,
  args: {
    songId: {
      type: GraphQLInt,
    },
    userId: {
        type: GraphQLString,
      }
  },
  async resolve(root, args) {
    let song = await Song.findOne({ songId: args.songId});

    if(!song) {
        song = new Song({
            _id: new mongoose.Types.ObjectId(),
            songId: args.songId,
        });

        await song.save();
    }

    let favoriteSong = await Favorite.findOne({ song: song._id, user: args.userId});

    if(!favoriteSong) {
        favoriteSong = new Favorite({
            _id: new mongoose.Types.ObjectId(),
            song: song._id,
            user: args.userId
          });
    
        await favoriteSong.save();

        let user = await User.findOne({_id: args.userId});
    
        await user.favorites.push(favoriteSong);
        await user.save();
        await song.favorites.push(favoriteSong);
        await song.save();
    }

    const favoriteReturn = await Favorite.findOne({ _id: favoriteSong._id }).populate('user');

    return {
        _id: favoriteReturn._id,
        songId: favoriteReturn.song
    }
  }
}


