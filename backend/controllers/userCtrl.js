const catchAsyncErr = require("../middlewares/catchAsyncErr")
const User = require("../models/userModel")
const { body, validationResult } = require('express-validator');
const ErrorHandler = require("../utils/errhandle");

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

    const userData = await User.findOne({ email });
    if (!userData) {
        return next(new ErrorHandler("User Doesn't Exixts", 400))
    }
    if (password !== userData.password) {
        return next(new ErrorHandler("Incorrect Password", 400))
    }
    return res.json({
        success:true,
    })


})