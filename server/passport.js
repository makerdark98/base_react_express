//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      userIDField: 'userID',
      passwordField: 'password',

      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, email, userID, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      User.findOne({
        where: {
          email: email,
          userID: userID,
        }
      }).then(function(user) {
        if (user) {
          return done(null, false, {
            message: 'That email or User ID is already taken'
          });
        } 
        else {
          var userPassword = generateHash(password); // hashing password
          var data = 
            {
              userID: userID,
              password: userPassword,
              email: email,
              nickname: req.body.nickname,
              phone: req.body.phone,
            };

          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }

            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));
}