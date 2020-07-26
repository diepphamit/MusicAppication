const axios = require('axios');
const GraphQLID = require('graphql').GraphQLID;

const AlbumType = require('../../types/album-type').albumType;
const Album = require('../../../models/album');

exports.addAlbum = {
  type: AlbumType,
  args: {
    albumId: {
      type: GraphQLID,
    }
  },
  async resolve(root, args) {
    let album = await Album.findOne({ albumId: args.albumId });
    if(!album){
        const albumAPI = await axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/album/" + args.albumId,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"a06fa6f1bbmsh68715e88d9a9652p1bb122jsn2ee5147a65bf",
                "useQueryString":true
                }
            });

        album = new Album({
            _id: new mongoose.Types.ObjectId(),
            albumId: albumAPI.data.id,
            title: albumAPI.data.title,
            cover_medium: albumAPI.data.cover_medium
          });
    
        await album.save();
    }

    return {
        id: album._id,
        albumId: album.albumId,
        title: album.title,
        cover_medium: album.cover_medium

    }
  }
}


