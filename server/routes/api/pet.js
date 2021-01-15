/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const Pet = require('../../models/pet');

// get/create
router
  .route('/')
  .get((req, res) => {
    Pet
      .find({ user: req.user._id })
      .then(data => {
        console.log(data);
        res.json({ success: true, data });
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      });

  }).post((req, res) => {
    console.log('pet params:');
    console.log(req.params);

    const { petName, petBreed, petAge } = req.body;
    console.log(req.user);
    Pet
      .create({
        user: req.user._id,
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

    Pet
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.json({ success: true });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });

module.exports = router;