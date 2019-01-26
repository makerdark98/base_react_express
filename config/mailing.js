const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const mailConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '/../config/config.json')))[env].mail;

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: mailConfig,
});

/* Test Code */
/*
const Console = console;
smtpTransport.sendMail({
  from: 'a27059753@gmail.com',
  to: 'makerdark98@naver.com',
  subject: 'subject',
  text: 'text',
}, (err, result) => {
  if (err) {
    Console.log(err);
  }
  Console.log(result);
});
*/

module.exports = smtpTransport;
