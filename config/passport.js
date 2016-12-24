var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy();


//Serialize and Deserialize
passport.serializeUser(function(user, done){
  done(null, user._id); //Default mongodb _id
});

passport.deseriazlizeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


//Middleware
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){

  User.findOne({email: email, function(err,user){
    if(err) return done(err);

    if(!user){
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }

    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('login Message', 'Oops! Wrong password Mate'));
    }

    return done(null, user);
  }});
}));

//Validation
exports.isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  res.redirect('/login');
}
