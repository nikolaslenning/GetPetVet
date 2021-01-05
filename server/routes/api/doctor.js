const express = require("express");
const router = express.Router();
const Doctor = require("../../models/user");

// create
router
    .route("/")
    .get((req, res) => {
        Doctor
            .find({isDoctor: { $eq: true }})
            .then(data => {
                res.json({success: true, data});
            })
            .catch(err => {
                res.json({sucess: false, err});
            });
    });

    module.exports = router;