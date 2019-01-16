var express  = require("express");
var router   = express.Router();
var passport= require("passport");
var User     = require("../../models/user");
var util     = require("../../util");

// Login
router.get("/login", function (req,res) {
  var userID = req.flash("userID")[0];
  var errors = req.flash("errors")[0] || {};
  res.send("home/login", {
    userID: userID,
    errors: errors
  });
});

// Sign up
router.post("/signup", function(req, res){
  User.create(req.body, function(err, user){
    if(err){
      req.flash("user", req.body);
      req.flash("errors", util.parseError(err));
    }
  });
});

// post login
router.post("/login",
  function(req,res,next){
    var errors = {};
    var isValid = true;

    if(!req.body.username){
      isValid = false;
      errors.userID = "UserID is required!";
    }
    if(!req.body.password){
      isValid = false;
      errors.password = "Password is required!";
    }

    if(isValid){
      next();
    } else {
      req.flash("errors",errors);
    }
  },
  passport.authenticate("local-login", function (err, user, info) {
    if (err)
        return next(err);

    if (!user)
        return res.status(401).json({message: info.message});

    req.logIn(user, function(err) {
        next(err)
    });

    res.json(req.user);
  }
));


// Logout
router.get("/logout", function(req, res) {
  req.logout();
});

module.exports = router;