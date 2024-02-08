const express = require('express')
const router = express.Router();
//import all controller
const taskcontroller = require('../controller/taskcontroller');

router.get('/', taskcontroller.task_list);
router.get('/:id', taskcontroller.task_details);
router.post('/', taskcontroller.task_create);
router.put('/:id/update',taskcontroller.task_update);
router.delete('/:id/delete',taskcontroller.task_delete);

module.exports = router;