const express = require('express');
const wordsController = require('../controllers/words-controller')
const wordHelper = require('../services/word-helper');
const wordsRouter = express.Router();


// wordsRouter.get('/', wordsController.index);

// wordsRouter.get('/', (req, res) => {
//   res.render('index');
// });

wordsRouter.post('/results', wordHelper.getWord, wordsController.results);

// wordsRouter.post('/', wordsController.create);

// wordsRouter.get('/auth/library', (req, res) => {
//   res.render('words/library');
// });

wordsRouter.get('/:id', wordsController.show);

wordsRouter.delete('/:id', wordsController.destroy);


wordsRouter.put('/:id', wordsController.update);

wordsRouter.get('/:id/edit', wordsController.edit);

module.exports = wordsRouter;

