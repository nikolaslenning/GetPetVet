const mongoose = require('mongoose');

async function db() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/getpetvet', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = db;