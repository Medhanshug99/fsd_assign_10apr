const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.patch('/:id', taskController.update);
router.delete('/:id', taskController.remove);

module.exports = router;
