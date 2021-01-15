const router = require("express").Router();
const calendarController = require("../../controllers/calendarController");

router
  .route("/")
  .get(calendarController.findPatientEvents)
  .post(calendarController.createEvent);

router
  .route("/doc")
  .get(calendarController.findDocEvents)
  .post(calendarController.createEvent);

router
  .route("/:id")
  .put(calendarController.update)
  .delete(calendarController.remove);

module.exports = router;