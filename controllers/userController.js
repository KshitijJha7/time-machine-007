const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

registerUser = asyncHandler(async(req,res)=>{
    const {username,password,email, type} = req.body;

    if(!username || !password || !email || !type){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400).json({
            message:"User Already Exists",
        });
        throw new Error("User Already Registered");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create(
        {
            username,
            password: hashedPassword,
            email,
            type,
        }
    );
    res.status(201).json({
        username: username,
        password: hashedPassword,
        email: email,
        type: type,
        message: "User Successfully Created"
    });
    console.log("API request Finished");
});


loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if( !email || !password){
        res.status(400).json({
            message: "Enter both Email and Password"
        });
        throw new Error("Please enter both Email and Password");
    }
    const user = await User.findOne({ email });
    const username = user.username;
    if(user && await bcrypt.compare(password,user.password)){
        console.log("API WORKING LOGIN");
        res.status(200).json({
            username: username,
            message: "Login Successful" 
        });
    }else{
        // res.status(400);
        // throw new Error("Invalid User Name or Password");
        res.status(400).json({
            message: "Login Failed" 
        });
        throw new Error("Invalid User Name or Password");
    }
});

module.exports = {
    registerUser,
    loginUser
};