const router = require('express').Router();
const { Todo } = require('../models');

// restful api
// /api/todo/
router
  .route('/')
  .get((req, res) => {
    Todo
      .find({})
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  })
  .post((req, res) => {
    console.log({ reqBody: req.body });

    Todo
      .create({
        text: req.body.text
      })
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });


// /api/todo/:id
router
  .route('/:id')
  .delete((req, res) => {
    console.log(req.params);

    Todo
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.json({ success: true });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });

module.exports = router;