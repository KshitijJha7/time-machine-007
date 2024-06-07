const asyncHandler = require('express-async-handler');
const Project = require('../models/projectSchema');

const createProject = asyncHandler(async (req,res)=>{
    const {project_name,project_id,description,clientName, monthlyBilling} = req.body;
    if( !description || !project_name || !project_id || !clientName || !monthlyBilling ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const projectExists = await Project.findOne({ project_id });
    // later on project_id will be created automatically
    
    if(projectExists){
        res.status(400).json({
            message: "Project Already Exists with the same ID"
        });
        throw new Error("Project already exists use a different project ID");
    }
    const newProject = await Project.create({
        project_name,
        project_id,
        description,
        clientName,
        monthlyBilling,
        hoursSpent:0,
        range:0.1,
        costToCompany:0,
        profit:monthlyBilling
    });
    res.status(200).json({
        project_name:project_name,
        project_id:project_id,
        description:description,
        clientName:clientName,
        monthlyBilling:monthlyBilling,
        message: "New Project Successfully Created"
    })
    console.log("Project Created successfully");
});

const getProject = asyncHandler(async (req,res)=>{
    const {project_name,project_id} = req.body;
    if( !project_id ){
        res.status(400);
        throw new Error("Both Project ID and Project Name are required");
    }
    const fetchedProject = await Project.findOne({ project_id });
    if(!fetchedProject){
        res.status(400);
        throw new Error("Project not found");
    }
    res.status(200).json(fetchedProject);     
});

const getAllProjects = asyncHandler(async (req,res)=>{
    const fetchedProjects = await Project.find();
    if(!fetchedProjects){
        res.status(404);
        throw new Error("Project Not Found");
    }
    res.status(200).json(fetchedProjects);
})

module.exports = {createProject,getProject, getAllProjects};