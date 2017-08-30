const express = require('express');
const wordsController = require('../controllers/words-controller')
const wordHelper = require('../services/word-helper');
const wordsRouter = express.Router();

wordsRouter.get('/', wordHelper.getWord)

wordsRouter.get('/', wordsController.index);
// wordsRouter.post('/', wordsController.create);

// wordsRouter.get('/auth/library', (req, res) => {
//   res.render('words/library');
// });

wordsRouter.get('/:id', wordsController.show);

wordsRouter.delete('/:id', wordsController.destroy);


wordsRouter.put('/:id', wordsController.update);

wordsRouter.get('/:id/edit', wordsController.edit);


module.exports = wordsRouter;

