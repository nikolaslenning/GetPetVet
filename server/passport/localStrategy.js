const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: 'email' // not necessary, DEFAULT
  },
  function (email, password, done) {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        // console.log(err)
        return done(err);
      }
      // console.log(user)
      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;