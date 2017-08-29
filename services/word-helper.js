require('isomorphic-fetch')


function getWord (req, res, next){
  fetch('https://od-api.oxforddictionaries.com/api/v1/entries/{source_lang}/{word_id}', {
    headers:{
      'app_id':'583cac1b',
      'app_key':'6df1c099a96a056d7584d36dfe5eedd5'
    }
  })
  .then((oxfordDictionaryRes) => {
      return oxfordDictionaryRes.json();
    }).then((data) => {

      res.locals.word = data.results.id;

      res.locals.definition = data.results.lexicalEntries.entries.senses.definitions;
      res.locals.exampleOfDefinition = data.results.lexicalEntries.entries.senses.examples.text;

      res.locals.etymology = data.results.entries.etymologies;


    }.catch((err) => {
      console.log(err);
      res.locals.word = null;
      res.locals.definition = null;
      res.locals.exampleOfDefinition = null;
      res.locals.etymologies = null;

      next();
    });
}

