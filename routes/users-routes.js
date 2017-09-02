const express = require('express');
const usersController = require('../controllers/users-controller')
const wordHelper = require('../services/word-helper');
const wordsRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const usersRouter = express.Router();




usersRouter.get('/', authHelpers.loginRequired, usersController.index);


module.exports = usersRouter;
