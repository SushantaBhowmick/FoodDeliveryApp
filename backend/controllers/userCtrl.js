const catchAsyncErr = require("../middlewares/catchAsyncErr")
const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const ErrorHandler = require("../utils/errhandle");
const jwt = require('jsonwebtoken')


exports.createUser = catchAsyncErr(async (req, res, next) => {
    const { name, location, email, password } = req.body;

    const already = await User.findOne({ email });
    if (already) {
        return next(new ErrorHandler("User Alerdy Exixts", 400))
    }

    const user = await User.create({
        name,
        location,
        email,
        password,
    })

    res.status(201).json({
        success: true,
        user
    })

})

exports.loginUser = catchAsyncErr(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await User.findOne({ email }).select("+password");;
    if (!user) {
        return next(new ErrorHandler("User Doesn't Exixts", 401))
    }
    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Incorrect Password", 401))
    }
    // const options = {
    //     expiresIn:new Date(Date.now() + process.env.JWT.EXPIRE * 24 * 60 * 60 * 1000),
    //     httpOnly:true,
    // }

    const data= {
        user:{
            id:user._id
        }
    }
    const authToken = jwt.sign(data,process.env.JWT_SECRET)

    return res.json({
        success:true,
        user,
        authToken
    })


})

//get user Details
exports.myProfile =catchAsyncErr(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        user
    })
})