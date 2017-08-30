// controllers/words-controller.js
const Word = require('../models/word');

const wordsController = {};

wordsController.index = (req, res) => {
  Word.findAll()
    .then(words => {
      res.render('words/index', { words: words });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};


wordsController.show = (req, res) => {
  Word.findById(req.params.id)
    .then(word => {
      res.render('words/show', {
        word: word
      });
    }).catch(err => {
      res.status(400).json(err);
    });
};






module.exports = wordsController;
