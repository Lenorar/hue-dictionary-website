require('isomorphic-fetch')

// let word_id = document.getElementById('word-retrieval').value
  // fetch('https://od-api.oxforddictionaries.com/api/v1/entries/en/'+{word_id}, {

function getWord(req, res, next){
  fetch('https://od-api.oxforddictionaries.com/api/v1/entries/en/metaphor', {
    headers:{
      'app_id':'583cac1b',
      'app_key':'6df1c099a96a056d7584d36dfe5eedd5'
    }
  })
  .then((oxfordDictionaryRes) => {
      return oxfordDictionaryRes.json();
    }).then((data) => {
      console.log('word', data.results[0].id);
      console.log('etymologies', data.results[0].lexicalEntries[0].entries[0].etymologies)
      console.log('definition', data.results[0].lexicalEntries[0].entries[0].senses[0].definitions)
      console.log('examples/used in a sentence', data.results[0].lexicalEntries[0].entries[0].senses[0].examples)
      console.log('other definitions', data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions)
      console.log('other examples', data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].examples)

      res.locals.word = data.results.id;

      // res.locals.definition = data.results.lexicalEntries.entries.senses.definitions;
      // res.locals.exampleOfDefinition = data.results.lexicalEntries.entries.senses.examples.text;

      // res.locals.etymology = data.results.entries.etymologies;

      // next(); THINK THIS IS MY PROBLEM! like where is going! i need to it go to index.html

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err)

      // next();
    });
}

module.exports = {
  getWord: getWord
}
