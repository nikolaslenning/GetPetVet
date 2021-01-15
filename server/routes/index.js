const router = require("express").Router();
const userRoutes = require("./api/user");
const petRoutes = require("./api/pet");
const doctorRoutes = require("./api/doctor");
const calendarRoutes = require("./api/calendar");

// API Routes
router.use("/user", userRoutes);
router.use("/pet", petRoutes);
router.use("/doctors", doctorRoutes);
router.use("/scheduler", calendarRoutes);

module.exports = router;