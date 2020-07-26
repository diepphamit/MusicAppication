var GraphQLList = require('graphql').GraphQLList;
var GraphQLInt = require('graphql').GraphQLInt;
const axios = require('axios'); 

var songType = require('../types/song-type');
const Song = require('../../models/song');

exports.getAllSongs = {
    type: songType.songPaginationType,
    args:{
        take: {
            type: GraphQLInt,
        },
        skip: {
            type: GraphQLInt,
        }
    },
    async resolve(root, args) {
        const songs = await axios({
            "method":"GET",
            "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":"bc09b16879mshb1a35e6d344a600p1e9d85jsnc8e9451c006f",
            "useQueryString":true
            },
            "params":{
                "q":"eminem"
            }
        });

        if(!songs) {
            throw new Error('Error');
        }

        return {
            songs: songs.data.data.slice(args.take*args.skip, args.take*args.skip + args.take), 
            total: songs.data.data.length
        };
    }
}

exports.getAllSongByAlbumId = {
    type: songType.songPaginationType,
    args: {                 
        albumId: {
            type: GraphQLInt
        },
        take: {
            type: GraphQLInt,
        },
        skip: {
            type: GraphQLInt,
        }             
    }, 
    async resolve(root, args) {
        const songs = await axios({
            "method":"GET",
            "url":"https://deezerdevs-deezer.p.rapidapi.com/album/" + args.albumId,
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
        return {
            total: songs.data.tracks.data.length,
            songs: songs.data.tracks.data.slice(args.take*args.skip,args.take*args.skip + args.take)
        }
    }
}

exports.getAllSongsInDB = {
    type: songType.songPaginationDBType,
    args: {
        take: {
            type: GraphQLInt
        },
        skip: {
            type: GraphQLInt
        }
    }, 
    async resolve(root, args) {
        const songs = await Song.find(); 
        if(!songs) {
            throw new Error('Error');
        }
        
        return {
            songs: songs.slice(args.take*args.skip,args.take*args.skip + args.take),
            total: songs.length
        };
        
    }
}

exports.getSongById = {
    type: songType.songType,
    args: {                 
        id: {type: GraphQLInt}             
    }, 
    async resolve(root, args) {
        const song = await axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/track/" + args.id,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"a06fa6f1bbmsh68715e88d9a9652p1bb122jsn2ee5147a65bf",
                "useQueryString":true
                }
            });

        if(!song) {
            throw new Error('Error');
        }

        return song.data;
    }
}