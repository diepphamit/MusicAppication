const axios = require('axios');
const GraphQLList = require('graphql').GraphQLList;
const GraphQLInt = require('graphql').GraphQLInt;

const albumPaginationType = require('../types/album-type').albumPaginationType;
const Album = require('../../models/album');

exports.getAllAlbums = {
        type: albumPaginationType,
        args:{
            take: {
                type: GraphQLInt,
            },
            skip: {
                type: GraphQLInt,
            }
        },
        async resolve(root, args) {
            const albums = await Album.find(); 
            if(!albums) {
                throw new Error('Error');
            }
            
            return {
                albums: albums.slice(args.take*args.skip,args.take*args.skip + args.take),
                total: albums.length
            };
        }   
}
