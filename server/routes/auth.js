const express = require('express');
const db = require('../../models/index');

const router = express.Router();
const User = db.user;

const Console = console;


router.get('/', (req, res) => {
  Console.log(req.query.token);
  res.send(req.query.token);
});

module.exports = router;
