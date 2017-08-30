const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));




const wordsRouter = require('./routes/word-routes');
app.use('/words', wordsRouter)



const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// const wordRoutes = require('./routes/word-routes');
// app.use('/search', wordRoutes)

app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});


// add below




