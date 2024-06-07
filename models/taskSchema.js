const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task_id:{
        type : String,
        required: [true,"Please add the Task ID"],
        unique: [true,"Task ID should be unique"]
    },
    task_name:{
        type : String,
        required: [true,"Please add the Task ID"]
    },
    description:{
        type : String,
        required: [true,"Please add the Task description"],
    },
    clientName : String,
    parent_project : String,
    completed : Boolean,
    active : Boolean,
    start: Date,
    spentTime:Number
},{
    timestamps : true,
});

module.exports = mongoose.model("task", taskSchema);