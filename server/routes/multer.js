const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const Console = console;
const dest = path.join(__dirname, '../../public/uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const prefix = 'IMAGE-';
    const date = Date.now();
    const photoName = prefix + date + path.extname(file.originalname);
    cb(null, photoName);
  },
});

const upload = multer({
  storage,
}).single('myImage');

router.post('/upload', upload, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      Console.log(err);
      return res.send(404).end();
    }
    Console.log('Request ---', req.body);
    Console.log('Request file ---', req.file);
    return res.send(200).end();
  });
});

module.exports = router;
