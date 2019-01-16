/* load bcrypt */
const bCrypt = require('bcrypt-nodejs');
const passportLocal = require('passport-local');

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = passportLocal.Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      userIDField: 'userID',
      passwordField: 'password',

      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },

    (req, email, userID, password, done) => {
      const generateHash = originPassword => bCrypt.hashSync(originPassword,
        bCrypt.genSaltSync(8), null);
      User.findOne({
        where: {
          email,
          userID,
        },
      }).then((result) => {
        if (!result) {
          const userPassword = generateHash(password); // hashing password
          const data = {
            userID,
            password: userPassword,
            email,
            nickname: req.body.nickname,
            phone: req.body.phone,
          };

          User.create(data).then((newUser) => {
            if (!newUser) {
              return done(null, false);
            }
            return done(null, newUser);
          });
          return done(null, false); // TODO: Edit Done Check Return valeu
        }
        return done(null, false, {
          message: 'That email or User ID is already taken',
        });
      });
    },
  ));
};
