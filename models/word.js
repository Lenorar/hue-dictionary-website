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

Word.create = (words, userid) => {
  return db.one(
    `
      INSERT INTO words
      (title, etymology, definition, user_id)
      VALUES ($1, $2, $3, $4) RETURNING *
    `,
    [words.title, words.etymology, words.definition, userid]
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


Word.showWordsUser = (userid) => {
  return db.one (
    `
    SELECT words.definition, words.title
    FROM words INNER JOIN
    users_words ON words.id = word_id
    WHERE users_words.user_id=$1
    `, [userid]
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

