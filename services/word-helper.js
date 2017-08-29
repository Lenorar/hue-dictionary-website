require('isomorphic-fetch')


function getWord(req, res, next){
  fetch('https://od-api.oxforddictionaries.com/api/v1/entries/en/hi', {
    headers:{
      'app_id':'583cac1b',
      'app_key':'6df1c099a96a056d7584d36dfe5eedd5'
    }
  })
  .then((oxfordDictionaryRes) => {
      return oxfordDictionaryRes.json();
    }).then((data) => {
console.log('=======>', data.results[0].id);
console.log('----->', data.results[0].lexicalEntries.entries[2])
      // res.locals.word = data.results.id;

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
