const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({    
    project_name:{
        type: String,
        required: [true,"Please add the project name"],
    },
    project_id:{
        type : String,
        required: [true,"Please add the project id"],
        unique: [true,"Project ID should be unique"]
    },
    description:{
        type : String,
        required: [true,"Please add the project desccription"],
    },
    clientName: {
        type : String,
        required: [true,"Please add the client name"],
    },

    monthlyBilling: {
        type : Number,
        required: [true,"Please add the monthly billing"],
    },
    costToCompany : Number,
    profit : Number,
    hoursSpent : Number,
    range:Number,
    pendingTasks: [String],

    completedTasks: [String],

},{
    timestamps : true,
});

module.exports = mongoose.model("Project", projectSchema);