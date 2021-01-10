const express = require("express");
const router = express.Router();
//const Stream = require('../../models/stream');

router
  .route("/stream/")
  //.route(`/stream/${this.state.value}`)
  .get((req, res) => {
    console.log("+++ HIT STREAM CHAT +++");
    console.log(res);
    console.log(req);
    return Stream;
  });

module.exports = router;