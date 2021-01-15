const mongoose = require("mongoose");
const Doctor = require("../models/user");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/getpetvet");

const doctorSeed = [
  {
    isDoctor: true,
    email: "gene_w@gmail.com",
    password: "$2a$10$YWK2X64B8gdiiEkg4vqHIuz6uW.OmswUsF1aLCjaCUQxbUX1yLolu",
    firstName: "Victor",
    lastName: "Frankenstein",
    address: "345 Creepy Castle Rd",
    province: "Transylvania, RO",
    zipCode: 500326,
    phoneNumber: 403592513588,
    about: "Dr. Frankenstien has been working with pets for years and has grown to love all animals so much. He is family friendly and will only do his best to insure the proper care for your pets.",
    schedule: "Monday - Friday 9:00 am - 5:00 pm",
    facility: "Franken Pets Vets",
    image: ""
  },
  {
    isDoctor: true,
    email: "j_kevorkian@gmail.com",
    password: "$2a$10$YWK2X64B8gdiiEkg4vqHIuz6uW.OmswUsF1aLCjaCUQxbUX1yLolu",
    firstName: "Jack",
    lastName: "Kevorkian",
    address: "2011 Royal Oak Rd",
    province: "Pontiac, MI",
    zipCode: 48302,
    phoneNumber: 124812354165,
    about: "Dr. Kevorkian has been working in the health industry for many years, and always places the patients well being first. He will ensure your pet gets exactly what they want and need.",
    schedule: "Monday - Friday 10:00 am - 6:00 pm",
    facility: "Kevorkian all Pets",
    image: ""
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