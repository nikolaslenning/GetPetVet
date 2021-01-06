const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({

  email: { type: String, unique: false, required: true },
  password: { type: String, unique: false, required: true },
  firstName: { type: String, unique: false, required: false },
  lastName: { type: String, unique: false, required: false },
  address: { type: String, unique: false, required: false },
  province: { type: String, unique: false, required: false },
  zipCode: { type: Number, unique: false, required: false },
  phoneNumber: { type: Number, unique: false, required: false },
  pet: [{
    petName: { type: String, unique: false, required: false },
    petBreed: { type: String, unique: false, required: false },
    petAge: { type: Number, unique: false, required: false },
  }],
  calendar: [{
    type: Schema.Types.ObjectId,
    ref: "Calendar",
    required: false
  }]
});

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======');
    next();
  } else {
    console.log('models/user.js hashPassword in pre save');

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;