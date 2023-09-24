const express = require('express');
const { getArtworks, addArtwork, getFavoriteArtworks, addFavoriteArtwork} = require('./controllers/artwork');

const router = express.Router();

router.get('/', getArtworks)
router.post('/', addArtwork);
router.put('/', addFavoriteArtwork)
router.get('/my-artworks', getFavoriteArtworks);


module.exports = router;