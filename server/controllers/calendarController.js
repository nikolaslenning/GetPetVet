/* eslint-disable no-unused-vars */
const Calendar = require("../models/calendar");

module.exports = {

  createEvent: function (req, res) {
    // console.log(req.body);
    Calendar
      .create({
        user: req.user._id,
        docID: req.body.docID,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        pet: req.body.pet
      }).then(data => {
        res.json({ success: true, data });
      }).catch(err => {
        res.json({ success: false, err });
      });
  },

  findPatientEvents: function (req, res) {
    Calendar
      .find({ user: req.user._id })
      .then(data => {
        // console.log(data);
        res.json({ success: true, data });
      })
      .catch(err => {
        // console.log(err);
        res.json({ success: false, err });
      });
  },

  findDocEvents: function (req, res) {
    // console.log(req.user._id);
    Calendar
      .find({ docID: req.user._id })
      .then(data => {
        // console.log(data);
        res.json({ success: true, data });
      })
      .catch(err => {
        // console.log(err);
        res.json({ success: false, err });
      });
  },

  remove: function (req, res) {
    // console.log(req);
    // console.log(req.params);
    Calendar
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false, err });
      });
  },

  update: function (req, res) {
    // console.log('HELP FIND IT');
    // console.log(req.body);
    // console.log(req.params);
    Calendar.findOneAndUpdate({ _id: req.body.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};