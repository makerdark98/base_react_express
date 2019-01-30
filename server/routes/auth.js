const express = require('express');
const db = require('../../models/index');

const router = express.Router();
const Verification = db.verification;

const Console = console;

router.post('/', (req, res) => {
  res.setHeader('Content-Type', 'text/json');
  Verification.findOne({
    where: {
      token: req.body.token,
    },
  }).then((match) => {
    if (match) {
      match.getUser()
        .then((user) => {
          user.update({ status: 'normal' });
          res.write(JSON.stringify({ return: true }));
          res.end();
        });
    } else {
      res.write(JSON.stringify({ return: false }));
      res.end();
    }
  }).catch((err) => {
    Console.log(err);
    res.write(JSON.stringify({ return: false }));
    res.end();
  });
});

module.exports = router;
