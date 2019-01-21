const util = {};

util.isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('errors', { login: 'Please login first' });
  }
};


module.exports = util;
