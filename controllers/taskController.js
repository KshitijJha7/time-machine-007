const asyncHandler = require('express-async-handler');
const Project = require('../models/projectSchema');
const Task = require('../models/taskSchema');

const createTask = asyncHandler(async (req,res)=>{
    const {task_id,task_name,description,project_id} = req.body;
    if(!task_id || !description || !task_name){
        res.status(400).json({
            message: "All fields marked * are mandatory",
        });
        throw new Error("All fields are mandatory");
    }
    console.log(project_id);
    const taskExists = await Task.findOne({ task_id });
    if(taskExists){
        res.status(400).json({
            message: "Task Already Exists",
        });
        throw new Error("Task Already Exists");
    }
    console.log(project_id);
    if(project_id){
        const parentExists = await Project.findOne({ project_id });
        if(!parentExists){ 
        res.status(400).json({
            message: "Incorrect Parent Project ID"
        });
        throw new Error("Parent doesn't exist");
        }
        const newTask = await Task.create({
            task_id,
            task_name,
            description,
            completed:false,
            active:false,
            start: new Date(),
            parent_project:project_id
        });
        res.status(200).json(
            {
                task_id:task_id,
                task_name:task_name,
                description:description,
                parent_project: project_id,
                active: false,
                completed: false,
                message: "Project related Task created succesfully"
            }
        );
    }else{
        const newTask = await Task.create({
            task_id,
            task_name,
            completed: false,
            active: false,
            description,
            start: new Date(),
            parent_project: "NONE"
        });
        res.status(200).json(
            {
                task_id:task_id,
                task_name:task_name,
                description:description,
                parent_project: "NONE",
                active:false,
                completed: false,
                message :"General Task Succesfully Created"
            }
        );
    }

    }
    );

const getTask = asyncHandler(async (req,res)=>{

});

const getAllTasks = asyncHandler(async (req,res)=>{
    const fetchedTasks = await Task.find();
    if(!fetchedTasks){
        res.status(404);
        throw new Error("Tasks Not Found");
    }
    res.status(200).json(fetchedTasks);
})

    const updateTaskActiveTrue = asyncHandler(async (req,res)=>{
        const {task_id} = req.body;
        const fetchedTask = await Task.findOne( { task_id } );
        if(!fetchedTask){
            res.status(404).json({
            message: "The requested task was not found"
        })
        }
        const date = new Date();
        console.log(date);
        const updateTask = await Task.findOneAndUpdate(    
        {task_id:task_id},
        {$set : {active : true ,start: date }},
        { returnOriginal: false })
        res.status(200).json({
        updateTask
        })
    })


    const updateTaskActiveFalse = asyncHandler(async (req,res)=>{
        const {task_id} = req.body;
        const fetchedTask = await Task.findOne( { task_id } );
        if(!fetchedTask){
            res.status(404).json({
                message: "The requested task was not found"
            })
        }
        
        const project_id = fetchedTask.parent_project;

        if(project_id != "NONE"){
            const now = new Date();
            const project = await Project.findOne({project_id})
            var time_spent = Math.abs((now.getTime() - fetchedTask.start.getTime())/(60*1000));
            time_spent = Math.round(time_spent * Math.pow(10, 2)) / Math.pow(10, 2);
            const resource_cost = 100; 
            const cost = await project.costToCompany + time_spent * resource_cost;
            var range = cost/project.monthlyBilling;
            time_spent+=project.hoursSpent;
            const prof = project.monthlyBilling - cost;
            const newProject = await Project.findOneAndUpdate( {project_id},
                 {$set :{hoursSpent : time_spent,costToCompany : cost, profit:prof , range:range}},
                 { returnOriginal: false }
            )
            res.status(200).json({
                newProject
            })
        }

        const updateTask = await Task.findOneAndUpdate(
            {task_id:task_id},
            {$set : {active : false}},
            { returnOriginal: false }
        )

        res.status(200).json({
            updateTask
        })
        
    })

    const updateTaskCompletedTrue= asyncHandler(async (req,res)=>{
        const {task_id} = req.body;
        const fetchedTask = await Task.findOne( { task_id } );
        if(!fetchedTask){
                res.status(404).json({
                    message: "The requested task was not found"
                })
        }
        
        const updateTask = await Task.findOneAndUpdate(
                {task_id:task_id},
                {$set : {completed : true}},
                { returnOriginal: false }
            )
        
            res.status(200).json({
                updateTask
            })
            })

        const updateTaskCompletedFalse= asyncHandler(async (req,res)=>{
                const {task_id} = req.body;
                const fetchedTask = await Task.findOne( { task_id } );
                if(!fetchedTask){
                    res.status(404).json({
                        message: "The requested task was not found"
                    })
                }
            
                const updateTask = await Task.findOneAndUpdate(
                    {task_id:task_id},
                    {$set : {completed : false}},
                    { returnOriginal: false }
                )
            
                res.status(200).json({
                    updateTask
                })
                })

module.exports = {createTask,
    getTask,
    getAllTasks,
    updateTaskActiveTrue,
    updateTaskActiveFalse,
    updateTaskCompletedTrue,
    updateTaskCompletedFalse
};