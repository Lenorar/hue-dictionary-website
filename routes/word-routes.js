const express = require('express');
const wordsController = require('../controllers/words-controller')


const quoteHelper = require('../services/word-helper');


const wordRoutes = express.Router();

wordRoutes.get('/search', quoteHelper.getWord);
