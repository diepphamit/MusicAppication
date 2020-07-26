const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    songId: {type: Number, require: true},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Favorite'}]
});

module.exports = mongoose.model('Song', songSchema);