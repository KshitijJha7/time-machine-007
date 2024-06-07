const express = require('express');
const taskRouter = express.Router();

const {createTask,
    getTask,
    getAllTasks,
    updateTaskActiveTrue,
    updateTaskActiveFalse,
    updateTaskCompletedTrue,
    updateTaskCompletedFalse
} = require('../controllers/taskController');

taskRouter.route("/create").post(createTask);

taskRouter.route("/updateTaskActiveTrue").put(updateTaskActiveTrue);

taskRouter.route("/updateTaskActiveFalse").put(updateTaskActiveFalse);


taskRouter.route("/updateTaskCompletedTrue").put(updateTaskCompletedTrue);
taskRouter.route("/updateTaskCompletedFalse").put(updateTaskCompletedFalse);

//taskRouter.route("/get").post(getTask);

taskRouter.route("/getAll").get(getAllTasks);

module.exports = taskRouter;

