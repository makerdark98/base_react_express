const express = require('express');
const db = require('../../models/index');

const router = express.Router();
const Verification = db.verification;

const Console = console;

router.get('/', (req, res) => {
  Verification.findOne({
    where: {
      token: req.query.token,
    },
  }).then((match) => {
    match.getUser()
      .then((user) => {
        Console.log(user);
      });
  });

  res.send(req.query.token);
});

module.exports = router;
