const express = require('express');
const dotenv=require('dotenv').config();
const app = express();
const userRouter=require("./routes/userRoute");
const path = require('path')
const taskRouter=require("./routes/taskRoute");
const projectRouter=require("./routes/projectRoute");
const errorHandler = require('./middleware/errorHandler');
const connectDb = require("./config/dbConnection");
// const getUser = require("./db_functions/db_functions");
const port=process.env.PORT || 3000;
connectDb();
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/static/index.html'));
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static('./static'));

app.use("/api/project",projectRouter);
app.use("/api/users",userRouter);
app.use("/api/task/",taskRouter);
//app.use(errorHandler);
// app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on PORT: ${port}`);
});


