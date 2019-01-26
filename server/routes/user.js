const express = require('express');
const random = require('random-key-generator');
const passport = require('../../config/passport');
const db = require('../../models/index');
const smtpTransport = require('../../config/mailing');

const Console = console;

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
  const token = random(10);
  User.create(req.body.user)
    .then((user) => {
      user.createVerification({ token });
    }).then(() => {
      smtpTransport.sendMail({
        from: 'test',
        to: req.body.user.email,
        subject: 'subject',
        text: token,
      }, (err) => {
        if (err) throw err;
        res.send({ return: 'success' });
      });
    }).catch((err) => {
      if (err) {
        Console.log(err);
        res.send({ return: 'false', errors: 'Sign up is not working' });
      }
    });
});

module.exports = router;
