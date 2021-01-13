/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

router
    .route("/")
    .get((req, res) => {
        console.log("+++ HIT VIDEO CHAT +++");
        // console.log(res);
        // console.log(req);
    });

    module.exports = router;