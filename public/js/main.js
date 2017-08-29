
let word = $('#word')
let definition = $('#definition')
let exampleOfDefinition = $('#wexampleOfDefinition')
let etymology = $('#etymology');


$('#submit').click(function(){
  $.ajax({
    url: 'localhost:3000/search',
    type: 'POST',
    word: $('#wordSearch').value()
  })

  .done(function(data) {


    //creates text for the values that wordSearch corresponds to
    word.text(data.results.id)
    definition.text(data.results.lexicalEntries.entries.senses.definitions)
    exampleOfDefinition.text(data.results.lexicalEntries.entries.senses.examples.text)
    etymology.text(data.results.entries.etymologies)

  })

  .fail(function() {
    $('body')
      .html('<h1>An error has occurred. Perhaps the JSON file you’re looking for ' +
        'has been removed.</h1>');
  });
});



