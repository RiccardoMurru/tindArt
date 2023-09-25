const mongoose = require('../db');

const { Schema } = mongoose;

const artworkSchema = new Schema({
  id: String,
  title: String,
  artists: String,
  medium: String,
  date: String,
  dimensions: String,
  collecting_institution: String,
  thumbnail: String,
  image: String,
  isFavorite: Boolean,
  isNotLiked: Boolean,
  _links: Object,
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;