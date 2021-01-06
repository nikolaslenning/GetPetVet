const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define petSchema
const petSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
	petName: { type: String, unique: false, required: true },
  petBreed: { type: String, unique: false, required: true },
  petAge: { type: Number, unique: false, required: true },

});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;