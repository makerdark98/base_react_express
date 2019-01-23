const express = require('express');
const passport = require('../../config/passport');
const db = require('../../models/index');

const User = db.user;
const router = express.Router();

// Login
router.get('/login', (req, res) => {
  const userID = req.flash('userID')[0];
  const errors = req.flash('errors')[0] || {};
  res.send({
    userID,
    errors,
  });
});

// Post Login
router.post('/login', (req, res, next) => {
  const errors = {};
  let isValid = true;

  if (!req.body.userID) {
    isValid = false;
    errors.userID = 'userID is required!';
  }
  if (!req.body.password) {
    isValid = false;
    errors.password = 'Password is required!';
  }

  if (isValid) {
    next();
  } else {
    req.flash('errors', errors);
  }

  passport.authenticate('local-login', (err, user) => {
    if (err) return next(err);
    if (!user) {
      errors.user = 'User is not exists';
      return res.send({ return: 'fail', errors: 'User is not exists' });
    }
    return res.send({ return: 'success' });
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ return: 'success' });
});

// create
router.post('/signup', (req, res) => {
  User.create(req.body, (err) => {
    if (err) {
      req.flash('user', req.body);
      res.send({ return: 'false', errors: 'Sign up is not working' });
    }
    res.send({ return: 'success' });
  });
});

module.exports = router;
