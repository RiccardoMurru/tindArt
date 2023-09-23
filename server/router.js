const express = require('express');
const { addArtwork } = require('./controllers/artwork');

const router = express.Router();

router.post('/', addArtwork);


module.exports = router;