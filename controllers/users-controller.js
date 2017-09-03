const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};




usersController.listOfWords = (req, res, next) => {
  User.findUserWords({
    user_id: req.user.id
  })

    .then( words => {
      console.log('give me something')

      res.render('user/profile', { word: words });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};




usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;



