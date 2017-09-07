// controllers/words-controller.js
const Word = require('../models/word');

const wordsController = {};

//this adds the searched word to words table
wordsController.create = (req, res, next) => {
  Word.create({
    title: req.body.title,
    etymology: req.body.etymology,
    definition: req.body.definition,
    examples: req.body.examples,
    otherdefinitions: req.body.otherdefinitions,
    otherexamples: req.body.otherexamples
  }, req.user.id)
  .then(newWord => {
        console.log('this is the word id', newWord.id);
        res.locals.newWord = newWord;
        next();
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
};

//this links user and word in users_words_
wordsController.userAndWord = (req, res, next) => {
  console.log(res.locals.newWord);
  Word.userAndWord({
    user_id: req.user.id,
    word_id: res.locals.newWord.id
  }).then((newWord) => {
      res.locals.newWord = newWord;
      next();
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

wordsController.index = (req, res) => {
  Word.showUserWithWords({
    user_id: req.user.id
  })
    .then( words => {
      res.render('user/profile', {
        word: words
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

//this pulls from the api
wordsController.results = (req, res) => {
  res.render('words/results', {
    word: res.locals.word
  })
};

//this shows the individual word
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

//allows user to edit
wordsController.edit = (req, res) => {
    console.log(req.params.id)
    Word.findById(req.params.id)
      .then(word => {
        console.log('word.examples ', word.examples);
        res.locals.word = word;
        res.render('words/edit', {
          word: word
        })
    })
      .catch(err => {
        res.status(400).json(err)
    })
};

//the edit gets updated on id page
wordsController.update = (req, res) => {
  Word.update({
      examples: req.body.examples
    }, req.params.id)
    .then((test) => {
      console.log('THIS IS THE TEST', test)
      res.redirect(`${req.params.id}`)
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

//destroys from users_words
wordsController.destroyFromUserAndWords = (req, res, next) => {
  Word.destroy(req.params.id)
    .then((word) => {
      res.locals.word = word;
      next();
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

//deletes from words
wordsController.deleteFromWords = (req, res) => {
  Word.deleteFromWords(req.params.id)
    .then(() => {
       res.redirect(`user/profile`)
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = wordsController;
