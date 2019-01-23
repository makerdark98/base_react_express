/* Passport Local Strategy */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../models/index');

const User = db.user;

const Console = console;

// serialize & deserialize User
/* TODO: I don't know how to operate this function(serializeUser, deserializeuser).
 * Plz Check this */
passport.serializeUser((user, done) => {
  done(null, user.userID);
});
passport.deserializeUser((userID, done) => {
  User.findOne({ userID }, (err, user) => {
    done(err, user);
  });
});

/* TODO: encrypt password */
passport.use('local',
  new LocalStrategy({
    /* Field Data property name must be usernameField, passwordField
     * I think if you don't redirect response,
     * don't need to set passReqToCallback true */
    usernameField: 'userID',
    passwordField: 'password',
    passReqToCallback: false,
  }, (userID, password, done) => {
    /* search User record */
    User.findOne({
      where: { userID },
    }).then((user) => {
      Console.log(user);
      // TODO : encrypte password compare
      if (user && user.password === password) {
        /* if matched data exists */
        done(null, user);
      } else {
        /* any record doesn't exists */
        done(null, false);
      }
    }).catch((err) => {
      throw err;
    });
  }));

module.exports = passport;
