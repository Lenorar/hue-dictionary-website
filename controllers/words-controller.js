// controllers/words-controller.js

const Word = require('../models/word');

const wordsController = {};

wordsController.index = (req, res) => {
  word.findAll()
    .then(words => {
      res.render('words/index', { words: words });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = wordsController;
