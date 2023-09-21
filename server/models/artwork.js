const mongoose = require('../db');

const { Schema } = mongoose;

const artworkSchema = new Schema({
  title: String,
  author: String,
  description: String,
  date: Date,
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;