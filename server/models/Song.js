const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  spotifyId: String,
  title: String,
  artist: String,
  album: String,
  imageUrl: String
});

module.exports = mongoose.model('Song', songSchema);
