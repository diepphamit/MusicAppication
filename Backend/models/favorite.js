const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    song: {type:  mongoose.Schema.Types.ObjectId, require: true, ref: 'Song'},
    user: {type:  mongoose.Schema.Types.ObjectId, require: true, ref: 'User'}
});

module.exports = mongoose.model('Favorite', favoriteSchema);