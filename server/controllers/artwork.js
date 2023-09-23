const Artwork = require('../models/artwork');

async function addArtwork (req, res) {
  try {
    const artwork = req.body;
    const existingArtwork = await Artwork.findOne({ artwork_id: artwork.id });
    if (existingArtwork) {
      return res
        .status(400)
        .json({ error: 'Artwork already exists' });
    };
    const newArtwork = await Artwork.create({
      artwork_id: artwork.id,
      title: artwork.title,
      artists: artwork._links.artists.href,
      medium: artwork.medium,
      date: artwork.date,
      dimensions: artwork.dimensions.cm.text,
      collecting_institution: artwork.collecting_institution,
      thumbnail: artwork._links.thumbnail.href,
      image: artwork.imgPath,
    });

    res.status(201).json(newArtwork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getFavoriteArtworks (req, res) {
  try {
    const artworks = await Artwork.find({});
    return res.status(200).json(artworks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  addArtwork,
  getFavoriteArtworks
}