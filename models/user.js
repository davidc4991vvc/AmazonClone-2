var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


// User Schema Attributes
var userSchema = new Schema({
  email: {type: String, unique: true, lowercase:true},
  password: String,

  profile:{
    name: {type:String, default: ''},
    picture: {type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: {type: Number, dafault: 0}
  }]
});


// Hash the password before saving it in the database.
userSchema.pre('save',function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    user.password = 123;
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Compare the password in the database and the one that the user typed in
userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};
