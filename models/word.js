// models/word.js

const db = require('../db/config');

const Word = {};

Word.findAll = () => {
  return db.query('SELECT * FROM words');
};


Word.findById = (id) => {
  return db.oneOrNone(`SELECT * FROM words WHERE id = $1`, [id]);
}


module.exports = Word;


