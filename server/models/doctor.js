const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define doctorSchema
const doctorSchema = new Schema({

	email: { type: String, unique: false, required: true },
	password: { type: String, unique: false, required: true },
	firstName: { type: String, unique: false, required: false },
	lastName: { type: String, unique: false, required: false },
	address: { type: String, unique: false, required: false },
	province: { type: String, unique: false, required: false },
	zipCode: { type: Number, unique: false, required: false },
    phoneNumber: { type: Number, unique: false, required: false },
    isDoctor: {type: Boolean, unique: false, required: false}
});

// Define schema methods
doctorSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

// Define hooks for pre-saving
doctorSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/doctor.js =======NO PASSWORD PROVIDED=======');
		next();
	} else {
		console.log('models/doctor.js hashPassword in pre save');

		this.password = this.hashPassword(this.password);
		next();
	}
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;