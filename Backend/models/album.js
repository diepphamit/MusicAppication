const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    albumId: {type: Number, require: true},
    title: {type: String},
    cover_medium: {type: String}
});

module.exports = mongoose.model('Album', albumSchema);