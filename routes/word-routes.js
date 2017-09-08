const express = require('express');
const wordsController = require('../controllers/words-controller')
const wordHelper = require('../services/word-helper');
const wordsRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');



wordsRouter.post('/results', wordHelper.getWord, wordsController.results);

wordsRouter.post('/', authHelpers.loginRequired, wordsController.create, wordsController.userAndWord, wordsController.index);

wordsRouter.get('/:id', wordsController.show);

wordsRouter.get('/:id/edit', wordsController.edit);

wordsRouter.put('/:id', wordsController.update);

wordsRouter.delete('/:id', wordsController.destroyFromUserAndWords, wordsController.deleteFromWords);


module.exports = wordsRouter;
