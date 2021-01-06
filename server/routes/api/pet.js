/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// get/create
router
  .route('/')
  .get((req, res) => {
    User
      .find({})
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  }).post((req, res) => {
    console.log('pet params:');
    console.log(req.params);

    const { petName, petBreed, petAge } = req.body;

    User
      .create({
          petName: petName,
          petBreed: petBreed,
          petAge: petAge
      }).then(data => {
        res.json({ success: true, data });
      }).catch(err => {
        res.json({ success: false });
      });
  });

// delete
router
  .route('/:id')
  .delete((req, res) => {
    console.log("pet req params");
    console.log(req.params);

    User
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.json({ success: true });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });

module.exports = router;