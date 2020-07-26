const signup = require('./users/signup').signup;
const signin = require('./users/signin').signin;
const addSong = require('./songs/add-song').addSongDB;
const addfavoriteSong = require('./songs/add-favorite-song').addFavoriteSong;
const addAlbum = require('./albums/add-album').addAlbum;

module.exports = {
  signup,
  signin,
  addSong,
  addfavoriteSong,
  addAlbum
}