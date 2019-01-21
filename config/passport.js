/* Passport Local Strategy */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../models/index');

const User = db.user;

// serialize & deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    done(err, user);
  });
});

// local strategy
passport.use('local-login',
  new LocalStrategy({
    userIDField: 'userID',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, userID, password, done) => {
    User.findOne({ userID })
      .select({ password: 1 })
      .exec((err, user) => {
        if (err) return done(err);
        if (user && user.authenticate(password)) {
          return done(null, user);
        }
        req.flash('userID', userID);
        req.flash('errors', { login: 'Incorrect userID or password' });
        return done(null, false);
      });
  }));

module.exports = passport;
