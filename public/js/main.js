

$('#wordSearch').click(function(){
  $.ajax({
    url: 'localhost:3000/search',
    type: 'POST',
    word: $('#wordSearch').value()
  })

  .done(function(data) {


    //creates text for the values that zip corresponds to
    name.text(data.name)
    temp.text(changeToFahrenheit(datatemp))
    description.text(data.weather[0].description)
    mintemp.text(changeToFahrenheit(data.main.temp_min))
    maxtemp.text(changeToFahrenheit(data.main.temp_max))

    //calculation that takes the number the database gives and converts to Fahrenheit
     function changeToFahrenheit (number) {
      dividebyten=(number/10)
      total = dividebyten*9/5 + 32
      fahrenheit = total.toPrecision(3);
      return fahrenheit;
    }

    //chnage the color for when it is hot(40+) vs cold(-40)
   changeColor(datatemp);
    function changeColor (datatemp){
      if (datatemp<40){
        temp.css('background-color','blue')
      }else {
        temp.css('background-color','red')
        console.log('yayayayay')
      }
    }
  })

  .fail(function() {
    $('body')
      .html('<h1>An error has occurred. Perhaps the JSON file you’re looking for ' +
        'has been removed.</h1>');
  });
});
