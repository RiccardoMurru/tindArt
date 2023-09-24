const express = require('express');
const {
  getArtworks,
  addArtwork,
  getFavoriteArtworks,
  addFavoriteArtwork,
  deleteArtwork,
  unlikeArtwork,
} = require('./controllers/artwork');

const router = express.Router();

router.get('/', getArtworks);
router.post('/', addArtwork);
router.put('/', addFavoriteArtwork);
router.put('/unlike', unlikeArtwork)
// router.delete('/', deleteArtwork);
router.get('/my-artworks', getFavoriteArtworks);

module.exports = router;
