const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define eventSchema
const eventSchema = new Schema({

    title: { type: String, unique: false, required: true },
    start: { type: Date, unique: false, required: true },
    end: { type: Date, unique: false, required: true },
    allDay: {type: Boolean},
    // resource: {any},

});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;