/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('../../passport');

router.post('/', (req, res) => {
    console.log('user signup');

    const { email, password, firstName, lastName, address, province, zipCode, phoneNumber, userID } = req.body;
    // ADD VALIDATION
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err);
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
                userID: userID
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
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body);
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('routes/api/user.js logged in', req.user);
        var userInfo = {
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            address: req.user.address,
            province: req.user.province,
            zipCode: req.user.zipCode,
            phoneNumber: req.user.phoneNumber,
            isDoctor: req.user.isDoctor,
            userID: req.user._id

        };
        res.send(userInfo);
    }
);

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
    console.log('===== user!!======');
    console.log("line 60 user.js" + req.user);
    console.log("line 61 user.js" + req.session.passport);
    console.log(req.session.passport);
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

router.get('/scheduler', (req, res) => {
    // console.log(req);
    // console.log(res);
    // if (req.user) {
    //     req.logout();
    //     res.send({ msg: 'logging out' });
    // } else {
    //     res.send({ msg: 'no user to log out' });
    // }
});

router.post('/scheduler', (req, res) => {
    // console.log(req);
    // console.log(res);
    // if (req.user) {
    //     req.logout();
    //     res.send({ msg: 'logging out' });
    // } else {
    //     res.send({ msg: 'no user to log out' });
    // }
});


module.exports = router;