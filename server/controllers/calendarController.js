const User = require("../models/user");

module.exports = {
    createEvent: function (req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findAll: function (req, res) {
        res.json([]);
    }
};