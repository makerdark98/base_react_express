const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('../config/passport');

/* app is rest api server */
const app = express();

/* sequelize migration */
const { sequelize } = require('../models');

sequelize.sync();

/* !!NOTICE!! When this project is deployed, configure system variable PORT */
const PORT = process.env.PORT || 4000;

/* recommendation in airbnb eslint. */
const Console = console;

app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use(logger('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

const ping = require('./routes/ping');
const user = require('./routes/user');
const auth = require('./routes/auth');

app.use('/api/ping', ping);
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

app.listen(PORT, () => {
  Console.log(`listening to PORT : ${PORT}...`);
});
