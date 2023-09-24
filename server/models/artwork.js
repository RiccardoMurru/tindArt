const mongoose = require('../db');

const { Schema } = mongoose;

const artworkSchema = new Schema({
  artwork_id: String,
  title: String,
  artists: String,
  medium: String,
  date: String,
  dimensions: String,
  collecting_institution: String,
  thumbnail: String,
  image: String,
  isFavorite: Boolean,
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;