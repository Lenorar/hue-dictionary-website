require('isomorphic-fetch')

// let word_id = document.getElementById('word-retrieval').value
  // fetch('https://od-api.oxforddictionaries.com/api/v1/entries/en/methapj, {

//this takes takes the wordsubmitted from the word/index
function getWord(req, res, next){
  fetch(`https://od-api.oxforddictionaries.com/api/v1/entries/en/${req.body.wordsubmitted}` , {
    headers:{
      'app_id':'583cac1b',
      'app_key':'6df1c099a96a056d7584d36dfe5eedd5'
    }
  })
  .then((oxfordDictionaryRes) => {
      return oxfordDictionaryRes.json();
    }).then((data) => {
      let word = {};
      word.title = data.results[0].id;

      let information = data.results[0].lexicalEntries[0].entries[0];

      word.etymology = information.etymologies;

      word.definition = information.senses[0].definitions;

      word.examples = information.senses[0].examples[0].text;

      word.otherdefinitions = information.senses[0].subsenses[0].definitions;

      word.otherexamples = information.senses[0].subsenses[0].examples[0].text;

      res.locals.word = word;

      console.log(res.locals.word);
      next();
    }).catch((err) => {
      res.render('index');
    });
}

module.exports = {
  getWord
}
