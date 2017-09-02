const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};




usersController.index = (req, res) => {
  console.log('please be here')
  User.findUserWords({
    user_id: req.user.id,

  })

    .then(words => {
      res.render('words/user-dictionary', { words: words });
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



