// const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./calendar");

// API Routes   /api/scheduler
router.use("/scheduler", apiRoutes);


//   router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"))
//   });


module.exports = router;