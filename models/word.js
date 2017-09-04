//dependences
const db = require('../db/config');
const Word = {};


//this adds a new word to the words table
Word.create = (words, userid) => {
  return db.one(
    `
      INSERT INTO words
      (title, etymology, definition, examples, otherdefinitions, otherexamples, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,
    [words.title, words.etymology, words.definition, words.examples, words.otherdefinitions, words.otherdefinitions, userid]
  );
};


//this inserts user id with word id to the 3rd table users_words
Word.userAndWord = (word) => {
  return db.query (
    `
    INSERT INTO users_words
    (user_id, word_id)
    VALUES ($1, $2) RETURNING *
    `,
    [word.user_id, word.word_id]
    );
};


//this selects words associated to user
Word.showUserWithWords = (userid) => {
  return db.manyOrNone(
    `
    SELECT * FROM words
    `,
    [userid]
    );
};


Word.findById = (id) => {
    console.log(id);
    return db.oneOrNone(
      `SELECT * FROM words
      WHERE id = $1`,
      [id]);
};


//this updates the examples or a work
Word.update = (word, id) => {
  console.log('this is the examples', word.examples);
  return db.none(
    `
      UPDATE words SET
      examples = $1
      WHERE id = $2
    `,
    [word.examples, id]
  );
};

//this deletes the word from users_words
Word.destroy = (word) => {
    console.log('id is',word)

    return db.none(
    `
      DELETE FROM users_words
      WHERE word_id=$1
    `,
    [word]
  );
};


//this deletes the word from the words table
Word.deleteFromWords = (word) => {
    console.log('id is',word)

    return db.none(
    `
      DELETE FROM words
      WHERE id=$1
    `,
    [word]
  );
};

module.exports = Word;
