// models/word.js

const db = require('../db/config');

const Word = {};

Word.findAll = () => {
  return db.query('SELECT * FROM words');
};

module.exports = Word;
