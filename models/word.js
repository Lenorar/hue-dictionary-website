// models/word.js

const db = require('../db/config');

const Word = {};

Word.findAll = () => {
  return db.query('SELECT * FROM words');
};

// Word.join = (word) => {
//   return db.query(
//     `SELECT * FROM users INNER JOIN
//     words ON users.id = word.user_id`
//     )
// }

Word.create = (words) => {
  return db.one(
    `
      INSERT INTO words
      (title, etymology, definition)
      VALUES ($1, $2, $3) RETURNING *
    `,
    [words.title, words.etymology, words.definition]
  );
};

Word.userAndWord = (words, user) => {
  return db.one (
    `
    INSERT INTO users_words
    (req.body.users(id), req.body.words(id)
    VALUES ($1, $2) RETURNING *
    `,
    [users_words.user_id, users_words.word_id]
    );
};

Word.findById = (id) => {
  return db.oneOrNone(`SELECT * FROM words WHERE id = $1`, [id]);
}

Word.update = (words, id) => {
  return db.none(
    `
      UPDATE words SET
      used_in_sentence = $1
      WHERE id = $2
    `,
    [words.used_in_sentence, id]
  );
};


Word.destroy = (id) => {
    return db.none(
    `
      DELETE FROM words
      WHERE id = $1
    `,
    [id]
  );
};


module.exports = Word;

