var getAllUsers = require('./user-query').queryType;
var getAllSongs = require('./song-query').querySongType;
var getAllSongByAlbumId = require('./song-query').querySongByIdAlbumType;

module.exports = {
    getAllUsers,
    getAllSongs,
    getAllSongByAlbumId
}