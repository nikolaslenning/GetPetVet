/* eslint-disable no-unused-vars */
const Calendar = require("../models/calendar");

module.exports = {

  createEvent: function (req, res) {
    console.log(req.body);
    Calendar
      .create({
        user: req.user._id,
        docID: req.body.docID,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
      }).then(data => {
        res.json({ success: true, data });
      }).catch(err => {
        res.json({ success: false });
      });
  },

  find: function(req, res) {
    Calendar
    .find({ user: req.user._id })
    .then(data => {
      console.log(data);
      res.json({ success: true, data });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });
  },

  // findAll: function (req, res) {
  //   Calendar
  //     .find({})
  //     .then(data => {
  //       res.json({ success: true, data });
  //     })
  //     .catch(err => {
  //       res.json({ success: false });
  //     });
  // },

  remove: function (req, res) {
    // console.log(req);
    console.log(req.params);
    Calendar
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  },
  // };
  update: function (req, res) {
    console.log('HELP FIND IT');
    console.log(req.body);
    console.log(req.params);
    Calendar.findOneAndUpdate({ _id: req.body.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  // module.exports = {
  //     createEvent: function (req, res) {
  //         Calendar.findOneAndUpdate({ _id: req.params.id }, req.body)
  //             .then(dbModel => res.json(dbModel))
  //             .catch(err => res.status(422).json(err));
  //     },

  // findAll: function (req, res) {
  //     res.json([]);
  // }
};