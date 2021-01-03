/* eslint-disable no-unused-vars */
const Calendar = require("../models/calendar");
// const { start, end, title } = req.body;

module.exports = {

    createEvent: function (req, res) {
        console.log(req.body);
        Calendar.create({
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
        }).then(data => {
            res.json({ success: true, data });
        }).catch(err => {
            res.json({ success: false });
        });
    },

    findAll: function (req, res) {
        Calendar
            .find({})
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false });
            });
    },

    remove: function (req, res) {
        console.log(req);
        console.log(req.params);
        Calendar
            .findByIdAndDelete(req.params.id)
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false });
            });
    }
    // };


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