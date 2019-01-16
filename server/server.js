const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport   = require('passport');
const session    = require('express-session');
var models = require("../models");

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

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());

const ping = require('./routes/ping');
const key = require('./routes/key');

app.use('/api/ping', ping);
app.use('/api/key', key);
app.use("/api/user", require("./routes/user"));

app.use((req, res, next) => {
  next(createError(404));
});

require('./passport.js')(passport, models.user);

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

app.listen(PORT, () => {
  Console.log(`listening to PORT : ${PORT}...`);
});
