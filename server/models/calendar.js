const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define eventSchema
const calendarSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  docID: { type: String, unique: false, required: true },
  title: { type: String, unique: false, required: true },
  start: { type: Date, unique: false, required: true },
  end: { type: Date, unique: false, required: true },
  pet: { type: String, unique: false, required: true },
  allDay: { type: Boolean },
});

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;