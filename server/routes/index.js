// const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const userRoutes = require("./api/user");
const petRoutes = require("./api/pet");
const doctorRoutes = require("./api/doctor");
const calendarRoutes = require("./api/calendar");
const videoRoutes = require("./api/videochat");
const streamRoutes = require("./api/stream");

// API Routes
// router.use("/api", apiRoutes);
router.use("/user", userRoutes);
router.use("/pet", petRoutes);
router.use("/doctors", doctorRoutes);
router.use("/scheduler", calendarRoutes);
router.use("/videochat", videoRoutes);
router.use("/stream", streamRoutes);

//   router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"))
//   });

module.exports = router;