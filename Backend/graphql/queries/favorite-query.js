const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const axios = require("axios");

const favoritePaginationType = require('../types/favorite-type').favoritePaginationType;
const songPaginationType = require('../types/song-type').songPaginationType;
const Favorite = require('../../models/favorite');

exports.getAllFavoriteSongs = {
        type: favoritePaginationType,
        args: {
            take: {
                type: GraphQLInt
            },
            skip: {
                type: GraphQLInt
            }
        },
        async resolve(root, args) {
            const favotites = await Favorite.find(); 
            if(!favotites) {
                throw new Error('Error');
            }
            
            return {
                favariteSongs: favotites.slice(args.take*args.skip,args.take*args.skip + args.take),
                total: favotites.length
            };
        }   
}

exports.getAllFavoriteSongsByUserId = {
    type: songPaginationType,
    args: {
        userId: {
            type: GraphQLString
        },
        take: {
            type: GraphQLInt
        },
        skip: {
            type: GraphQLInt
        }
    },
    async resolve(root, args) {
        let listReturn = []
        const favotites = await Favorite.find({ user: args.userId }).populate('song');

        for(const item of favotites){
            let song = await axios({
                    "method":"GET",
                    "url":"https://deezerdevs-deezer.p.rapidapi.com/track/" + item.song.songId,
                    "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key":"a06fa6f1bbmsh68715e88d9a9652p1bb122jsn2ee5147a65bf",
                    "useQueryString":true
                    }
                });

                listReturn.push(song.data);
        }

        if(!listReturn) {
            throw new Error('Error');
        }
        
        return {
            songs: listReturn.slice(args.take*args.skip,args.take*args.skip + args.take),
            total: listReturn.length
        };
    }   
}
