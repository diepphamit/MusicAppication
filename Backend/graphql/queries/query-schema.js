const users = require('./user-query').getAllUsers;
const songs = require('./song-query').getAllSongs;
const songsAlbum = require('./song-query').getAllSongByAlbumId;
const songsDB = require('./song-query').getAllSongsInDB;
const song = require('./song-query').getSongById;
const favorites = require('./favorite-query').getAllFavoriteSongs;
const favoriteSongsByUser = require('./favorite-query').getAllFavoriteSongsByUserId;
const albums = require('./album-query').getAllAlbums;

module.exports = {
    users,
    songs,
    songsAlbum,
    songsDB,
    song,
    favorites,
    favoriteSongsByUser,
    albums
}