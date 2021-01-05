const mongoose = require("mongoose");
const Doctor = require("../models/doctor");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/getpetvet");

const doctorSeed = [
    {
      email: "gene_w@gmail.com",
      password: "1234",
      firstName: "Victor",
      lastName: "Frankenstein",
      address: "345 Creepy Castle Rd",
      province: "Transylvania, RO",
      zipCode: 500326,
      phoneNumber: 403592513588,
      isDoctor: true
    },
    {
      email: "j_kevorkian@gmail.com",
      password: "1234",
      firstName: "Jack",
      lastName: "Kevorkian",
      address: "2011 Royal Oak Rd",
      province: "Pontiac, MI",
      zipCode: 48302,
      phoneNumber: 124812354165,
      isDoctor: true
    }
  ];
  Doctor.remove({})
    .then(() => Doctor.collection.insertMany(doctorSeed))
    .then(data => {
      console.log(data.result.n + " records inserted!");
      console.log(data.result + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });