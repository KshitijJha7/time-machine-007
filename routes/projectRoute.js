const express = require('express');
const {createProject, getProject, getAllProjects} = require('../controllers/projectController');
const projectRouter = express.Router();

projectRouter.route('/create').post(createProject);

projectRouter.route('/get').get(getProject);

projectRouter.route('/getAll').get(getAllProjects);

module.exports = projectRouter;
