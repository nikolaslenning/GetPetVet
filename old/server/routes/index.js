const router = require('express').Router();
const todos = require('./todo.routes');

// /api/todo
router.use('/api/todo', todos);

module.exports = router;