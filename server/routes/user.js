const express = require('express');
const random = require('random-key-generator');
const passport = require('../../config/passport');
const db = require('../../models/index');
const smtpTransport = require('../../config/mailing');

const Console = console;

const User = db.user;
const router = express.Router();

router.post('/login', (req, res) => {
  const callbackAuth = (err, user) => {
    /* err : error */
    /* !user : does not match user */
    /* If you want to specify this case uncomment under comment */
    // res.send({ return: 'fail', errors: 'User is not exist' });
    try {
      if (err || !user) throw (err || !user);
      res.send({ return: 'success' });
    } catch (error) {
      res.send({ return: error });
    }
  };
  /* set userID and password into body
   * because passport interface */
  req.body.userID = req.body.user.userID;
  req.body.password = req.body.user.password;

  if (!req.body.user.userID || !req.body.user.password) {
    res.send({ return: 'Error : does not complete form' });
  } else {
    const runAuth = passport.authenticate('local', callbackAuth);
    runAuth(req);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ return: 'success' });
});

// create
router.post('/signup', (req, res) => {
  const token = random(10);
  res.setHeader('Content-Type', 'text/json');
  req.body.user.status = 'unauth';
  User.create(req.body.user)
    .then((user) => {
      user.createVerification({ token });
    }).then(() => {
      const serverURL = 'http://localhost:3000';
      smtpTransport.sendMail({
        from: 'test',
        to: req.body.user.email,
        subject: 'subject',
        html: `<a>${serverURL}/auth/${token}</a>`,
      }, (err) => {
        if (err) {
          Console.log(err);
          res.write(JSON.stringify({ return: 'false', errors: 'Email Fail' }));
        } else {
          res.write(JSON.stringify({ return: 'success' }));
        }
        res.end();
      });
    }).catch((err) => {
      if (err) {
        Console.log(err);
        res.write(JSON.stringify({ return: 'false', errors: 'Sign up is not working' }));
        res.end();
      }
    });
});

module.exports = router;
