/* Passport Local Strategy */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../models/index');

const User = db.user;

const Console = console;

Console.log('hihi');

// serialize & deserialize User
passport.serializeUser((user, done) => {
  Console.log(user);
  done(null, user.userID);
});
passport.deserializeUser((userID, done) => {
  Console.log(userID);
  User.findOne({ userID }, (err, user) => {
    done(err, user);
  });
});

// local strategy
passport.use('local',
  new LocalStrategy({
    usernameField: 'userID',
    passwordField: 'password',
    passReqToCallback: true,
  }, (userID, password, done) => {
    // Console.log(res);
    Console.log(userID);
    User.findOne({
      where: { userID },
    })
      .then((err, user) => {
        if (err) return done(err);
        if (user && user.authenticate(password)) {
          return done(null, user);
        }
        // res.send({ userID });
        // res.send({ errors: 'Incorrect userID or password' });
        return done(null, false);
      });
  }));

module.exports = passport;
