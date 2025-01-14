const express = require("express");
const { createEvent, getAllEvents, createMockEvents, updateEvent, editEvent, deleteEvent } = require("./EventController");

const router = express.Router();

router.route("/events")
    .get(getAllEvents)
    .post(createEvent)
    .put(updateEvent)
    .patch(editEvent)
    .delete(deleteEvent);
    
router.route("/events/mock")
    .post(createMockEvents);

module.exports = router;