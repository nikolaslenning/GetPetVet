const express = require("express");
const router = express.Router();
const User = require("../../models/user");

// create
router
    .route("/")
    .get((req, res) => {
        User
            .find({ isDoctor: { $eq: true } })
            .then(data => {
                res.json({success: true, data});
            })
            .catch(err => {
                res.json({sucess: false, err});
            });
    });

    module.exports = router;