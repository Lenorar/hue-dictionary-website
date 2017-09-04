// models/word.js

const db = require('../db/config');

const Word = {};

Word.findAll = () => {
  return db.query('SELECT * FROM words');
};



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


Word.showUserWithWords = (userid) => {
  return db.manyOrNone(
    `
    SELECT * FROM words
    `,
    [userid]
    );
};
Word.findById = (id) => {
    console.log('this is the id', id);
    return db.oneOrNone(`SELECT * FROM words WHERE id = $1`, [id])
}


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
