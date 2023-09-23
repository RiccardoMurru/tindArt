const express = require('express');
const { addArtwork, getFavoriteArtworks} = require('./controllers/artwork');

const router = express.Router();

router.post('/', addArtwork);
router.get('/my-artworks', getFavoriteArtworks);


module.exports = router;