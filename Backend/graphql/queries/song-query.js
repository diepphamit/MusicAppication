var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLID = require('graphql').GraphQLID;
var songType = require('../types/song-type').songType;
const axios = require('axios'); 

// Query
exports.querySongType = new GraphQLObjectType({
  name: 'Query',
  
  fields: function () {
    return {
      songs: {
        type: new GraphQLList(songType),
        async resolve() {
            const songs = await axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"bc09b16879mshb1a35e6d344a600p1e9d85jsnc8e9451c006f",
                "useQueryString":true
                },"params":{
                "q":"eminem"
                }
                });

            if(!songs) {
                throw new Error('Error');
            }

            return songs.data.data;
        }
      }
    }
    
  }
});


exports.querySongByIdAlbumType = new GraphQLObjectType({
    name: 'Query',
    args: {
        albumId: {
          type: GraphQLID,
        }
      },
    fields: function () {
      return {
        songs: {
          type: new GraphQLList(songType),
          async resolve() {
              const songs = await axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/album/" + params.albumId,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"bc09b16879mshb1a35e6d344a600p1e9d85jsnc8e9451c006f",
                "useQueryString":true
                }
                });
  
              if(!songs) {
                  throw new Error('Error');
              }
  
              return songs.data.data.tracks.data;
          }
        }
      }
      
    }
  });