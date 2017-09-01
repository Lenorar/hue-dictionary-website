// controllers/words-controller.js
const Word = require('../models/word');

const wordsController = {};

//this adds the searched word to words table
wordsController.create = (req, res, next) => {
  console.log('IM HERE --> ');
  Word.create({
    title: req.body.title,
    etymology: req.body.etymology,
    definition: req.body.definition
    // examples: req.body.examples,
    // otherdefinitions: req.body.otherdefinitions,
    // otherexamples: req.body.otherexamples,
}, req.user.id)
.then(newWord => {
      console.log('what we just inserted', newWord.id);
      res.locals.newWord = newWord;
      next();
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
};


wordsController.userAndWord = (req, res) => {
  console.log('inside userAndWord -> ', res.locals.newWord.id);
  Word.userAndWord({
    user_id: req.user.id,
    word_id: res.locals.newWord.id
  })
    .then((newWord) => {
      console.log('what we just inserted', newWord);
      res.locals.newWord = newWord;
      next();
      // res.render('words/user-dictionary')
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}


wordsController.showWordsUser = (req, res) => {
  console.log('inside showWordsUser ->', res.locals.newWord);
  Word.showWordsUser({
    user_id: req.user.id,
  })
    .then(listOfWords => {

      console.log('THIS', listOfWords);
      // res.locals.newWord = newWord;
      res.render('words/user-dictionary', {list: listOfWords});
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}








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
