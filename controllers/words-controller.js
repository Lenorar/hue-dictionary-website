// controllers/words-controller.js
const Word = require('../models/word');

const wordsController = {};

wordsController.results = (req, res) => {
  res.render('words/results', {
    word: res.locals.word
  })
};

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


// wordsController.create = (req, res) => {
//   Word.create({
//     word: req.body.word,
//     definition: req.body.definition,
//     // user_id: req.user.id,
//   }).then(word => {
//       res.redirect(`/words/${word.id}`);
//   }).catch(err => {
//     console.log(err);
//     res.status(400).json(err);
//   })
// };


wordsController.edit = (req, res) => {
  Word.findById(req.params.id)
    .then(word => {
      res.render('words/edit', {
        word:word
      })
    }).catch(err => {
      res.status(400).json(err);
    });
};

//have to update this
wordsController.update = (req, res) => {
  Word.update({
    used_in_sentence: req.body.used_in_sentence
  }, req.params.id)
  .then(() => {
    res.redirect(`/words/${req.params.id}`)
  }).catch(err =>{
    res.status(400).json(err);
  });
};


wordsController.destroy = (req, res) => {
  Word.destroy(req.params.id)
    .then(() => {
      res.redirect('/words')
    })
    .catch(err => {
      res.status(400).json(err);
    });
};


module.exports = wordsController;
