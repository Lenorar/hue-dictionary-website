// controllers/words-controller.js
const Word = require('../models/word');

const wordsController = {};

//this adds the searched word to words table
wordsController.create = (req, res, next) => {
  console.log('IM HERE --> ');
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


wordsController.userAndWord = (req, res, next) => {
  console.log('inside userAndWord -> ', res.locals.newWord);
  Word.userAndWord({
    user_id: req.user.id,
    word_id: res.locals.newWord.id
  })
    .then((newWord) => {
      res.locals.newWord = newWord;
      next();
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

wordsController.index = (req, res) => {
  console.log('please be here')
  Word.showUserWithWords({
    user_id: req.user.id
  })

    .then( words => {
      console.log('give me something')

      res.render('index', { word: words });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

// wordsController.showUserWithWord = (req, res) => {
//   console.log('here maybe?')
//   Word.showUserWithWord({
//     user_id: req.user.id,
//   })
//     .then(listOfWords => {

//       console.log('THIS', listOfWords);
//       // res.locals.newWord = newWord;
//       res.render('words/user-dictionary', {list: listOfWords});
//     })
//     .catch((err) => {
//       res.status(500).json(err)
//     })
// }






wordsController.results = (req, res) => {
  res.render('words/results', {
    word: res.locals.word
  })
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



// wordsController.edit = (req, res) => {
//   Word.findById(req.params.id)
//     .then(word => {
//       res.render('words/edit', {
//         word:word
//       })
//     }).catch(err => {
//       res.status(400).json(err);
//     });
// };

wordsController.edit = (req, res) => {
  console.log("edit controller");
  Word.findById(req.params.id)
    .then(editWord => {
      res.locals.editWord = editWord;
      console.log(editWord);
      res.render('words/edit', {
        editWord: editWord
      });
    }).catch(err => {
      res.status(400).json(err);
    });
};

//have to update this
wordsController.update = (req, res) => {
    console.log('id!' , req.params.id);
    console.log('examples!' , res.params.title);

  Word.update({
    examples: req.body.examples,
    title: req.body.title
  }, req.params.id)
  .then(() => {
    res.redirect(`/words/${req.params.id}`)
  }).catch(err =>{
    res.status(400).json(err);
  });
};


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


wordsController.deleteFromWords = (req, res) => {
  Word.deleteFromWords(req.params.id)
    .then(() => {
       res.redirect(`/user/profile`)

    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = wordsController;
