const express = require('express');
const passport = require('../../config/passport');
const db = require('../../models/index');

const User = db.user;
const router = express.Router();

const Console = console;
// Post Login
router.post('/login', (req, res, next) => {
  const errors = {};
  let isValid = true;

  if (!req.body.user.userID) {
    isValid = false;
    errors.userID = 'userID is required!';
  }
  if (!req.body.user.password) {
    isValid = false;
    errors.password = 'Password is required!';
  }
  req.body.userID = req.body.user.userID;
  req.body.password = req.body.user.password;
  if (!isValid) {
    res.send({ return: 'fail', errors });
  }
  Console.log(req.body.user);
  passport.authenticate('local', (err, user, info) => {
    Console.log(err);
    if (err) { return next(err); }
    Console.log(user);
    Console.log(info);
    if (!user) { return res.send({ return: 'fail', errors: 'User is not exist' }); }
    req.logIn(user, () => {
      if (err) { return next(err); }
      return res.send({ return: 'success' });
    });
    return res.send({ return: 'success' });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ return: 'success' });
});

// create
router.post('/signup', (req, res) => {
  User.create(req.body.user, (err) => {
    if (err) {
      res.send({ return: 'false', errors: 'Sign up is not working' });
    }
    res.send({ return: 'success' });
  });
});

module.exports = router;
