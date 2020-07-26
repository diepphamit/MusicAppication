const GraphQLID = require('graphql').GraphQLID;

const SongDBType = require('../../types/song-type').songDBType;
const Song = require('../../../models/song');

exports.addSongDB = {
  type: SongDBType,
  args: {
    songId: {
      type: GraphQLID,
    }
  },
  async resolve(root, args) {
    const song = await Song.findOne({ songId: args.songId });
    if(song){
      throw new Error("This song has been existed");
    }
    
    const songAdd = new Song({
        _id: new mongoose.Types.ObjectId(),
        songId: args.songId
      });

    const result = await songAdd.save();
    if(result) {
        return {
            _id: songAdd._id,
            songId: songAdd.songId
        }
    }

    return Error('Error');
  }
}


