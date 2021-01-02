/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const Pet = require('../../models/pet');

// create
router
  .route('/')
  .get((req, res) => {
    Pet
      .find({})
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  }).post((req, res) => {
    console.log('pet added');

    const { petName, petBreed, petAge } = req.body;

    Pet.create({
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