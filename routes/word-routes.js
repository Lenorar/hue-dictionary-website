const express = require('express');
const wordsController = require('../controllers/words-controller')
const wordHelper = require('../services/word-helper');
const wordsRouter = express.Router();

// wordsRoutes.get('/', wordHelper.getWord)

wordsRouter.get('/', wordsController.index)

wordsRouter.get('/:id', wordsController.show)

wordsRouter.delete('/:id', wordsController.destroy)


wordsRouter.put('/:id', wordsController.update)

wordsRouter.get('/:id/edit', wordsController.edit)


module.exports = wordsRouter;

