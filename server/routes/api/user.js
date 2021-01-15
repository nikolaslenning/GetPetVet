/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('../../passport');

router.post('/', (req, res) => {
  const { email, password, firstName, lastName, address, province, zipCode, phoneNumber, isDoctor } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      // console.log('User.js post error: ', err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
      // eslint-disable-next-line brace-style
    }
    else {
      const newUser = new User({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: address,
        province: province,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        isDoctor: isDoctor
      });
      newUser.save((err, savedUser) => {
        // eslint-disable-next-line curly
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post(
  '/login',
  function (req, res, next) {
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    const userInfo = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      address: req.user.address,
      province: req.user.province,
      zipCode: req.user.zipCode,
      phoneNumber: req.user.phoneNumber,
      isDoctor: req.user.isDoctor
    };
    res.send(userInfo);
  }
);

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user, data: req.body });
  } else {
    res.json({ user: null });
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

module.exports = router;