// models/word.js

const db = require('../db/config');

const Word = {};

Word.findAll = () => {
  return db.query('SELECT * FROM words');
};

// Word.join = (word) => {
//   return db.query(
//     `SELECT * FROM users INNER JOIN
//     words ON users.id = words.user_id`
//     )
// }




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

// Word.showUserWithWords = (userid) => {
//   return db.manyOrNone (
//     `
//     SELECT words.definition, words.title
//     FROM words INNER JOIN
//     users_words ON words.id = word_id
//     WHERE users_words.user_id=$1
//     RETURNING *
//     `,
//      [userid]
//     );
// };







Word.showUserWithWords = (userid) => {
  return db.manyOrNone(
    `
    SELECT * FROM words
    `,
    [userid]
    );
};




// Word.showUserWithWords = (id) => {
//   return db.oneOrNone(`SELECT * FROM words WHERE words.user_id = $1`, [id]);
// }

Word.update = (word, id) => {
  console.log(word);
  return db.one(
    `
      UPDATE words SET

      WHERE id = $3
      RETURNING *
    `,
    [ id]
  );
};

Word.findById = (id) => {
    console.log('this is the id', id);
    return db.oneOrNone(`SELECT * FROM words WHERE id = $1`, [id])
}


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
