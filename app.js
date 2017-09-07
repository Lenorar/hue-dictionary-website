//dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const authRouter = require('./routes/auth-routes');
const wordsRouter = require('./routes/word-routes');
const usersRouter = require('./routes/users-routes');


app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

//index route
app.get('/', (req, res) => {
  res.render('index');
});


//in order to get username on my profile page
app.use((req, res, next) => {
  res.locals.users= req.users || null;
  next();
});



app.use('/auth', authRouter);

app.use('/words', wordsRouter)

app.use('/user', usersRouter)

app.use('/words/user-dictionary', wordsRouter)

//if all fails
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});






