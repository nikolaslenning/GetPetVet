// const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./api/user");
const petRoutes = require('./api/pet');
const doctorRoutes = require("./api/doctor");

// API Routes
router.use("/api", apiRoutes);
router.use("/user", userRoutes);
router.use('/pet', petRoutes);
router.use("/doctors", doctorRoutes);


//   router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"))
//   });


module.exports = router;