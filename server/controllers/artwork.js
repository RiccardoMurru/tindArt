const Artwork = require('../models/artwork');
require('dotenv').config();

async function getArtworksFromAPI (req, res) {
  const url = process.env.API_URL;
  console.log(url);
  try {
    const response = await fetch(`${process.env.API_URL}/artworks?size=50`, {
      headers: {
        'X-XAPP-Token': process.env.API_TOKEN,
      },
    });
    const data = await response.json();
    const artworks = data._embedded.artworks;
    res.status(200).json(artworks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  // at the beginning the artworks are added to the db
async function addArtwork (req, res) {
  try {
    const artwork = req.body;
    const existingArtwork = await Artwork.findOne({ id: artwork.id });
    if (existingArtwork) {
      return res
        .status(200).json({message: 'Artwork already exists'});
    };
    const newArtwork = await Artwork.create({
      id: artwork.id,
      title: artwork.title,
      artists: artwork.artists,
      medium: artwork.medium,
      date: artwork.date,
      dimensions: artwork.dimensions.cm.text,
      collecting_institution: artwork.collecting_institution,
      thumbnail: artwork._links.thumbnail.href,
      image: artwork.image,
      isFavorite: artwork.isFavorite,
      isNotLiked: artwork.isNotLiked,
      _links: artwork._links,
    });

    res.status(201).json(newArtwork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getArtworks(req, res) {
  try {
    // get all artworks that are not favorite nor not liked
    const artworks = await Artwork.find({
      isFavorite: false,
      isNotLiked: false
    });
    return res.status(200).json(artworks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function addFavoriteArtwork (req, res) {
  try {
    const artwork = req.body;
    await Artwork.updateOne(
      { id: artwork.id },
      {
        artists: artwork.artists,
        isFavorite: artwork.isFavorite
      }
    );

    res.status(201)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getFavoriteArtworks (req, res) {
  try {
    const artworks = await Artwork.find({
      isFavorite: true,
    });
    return res.status(200).json(artworks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function deleteArtwork (req, res) {
  try {
    const artwork = req.body;
    const deletedArtwork = await Artwork.deleteOne({
      id: artwork.id,
    })
    res.status(200).json(deleteArtwork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function unlikeArtwork (req, res) {
  try {
    const artwork = req.body;
    await Artwork.updateOne(
      { id: artwork.id },
      {
        isFavorite: artwork.isFavorite,
        isNotLiked: artwork.isNotLiked,
      }
    );
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getArtworks,
  addArtwork,
  getFavoriteArtworks,
  addFavoriteArtwork,
  deleteArtwork,
  unlikeArtwork,
  getArtworksFromAPI,
}