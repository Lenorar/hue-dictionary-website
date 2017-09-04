const express = require('express');
const usersController = require('../controllers/users-controller')
const wordHelper = require('../services/word-helper');
const wordsRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const usersRouter = express.Router();

usersRouter.get('/profile', authHelpers.loginRequired, usersController.listOfWords);

module.exports = usersRouter;
