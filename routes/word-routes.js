const express = require('express');
const wordsController = require('../controllers/words-controller')
const wordHelper = require('../services/word-helper');




const wordRoutes = express.Router();

wordRoutes.get('/search', quoteHelper.getWord);
