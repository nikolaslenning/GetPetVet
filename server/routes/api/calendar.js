const router = require("express").Router();
const calendarController = require("../../controllers/calendarController");

router
  .route("/")
  // .get(calendarController.findAll)
  .get(calendarController.findPatientEvents)
  .post(calendarController.createEvent);

router
  .route("/doc")
  // .get(calendarController.findAll)
  .get(calendarController.findDocEvents)
  .post(calendarController.createEvent);

// router.get("/", (req, res) => {
//   res.json("testtesttest33333");
// });
router
  .route("/:id")
  //   .get(calendarController.findById)
  .put(calendarController.update)
  .delete(calendarController.remove);

module.exports = router;