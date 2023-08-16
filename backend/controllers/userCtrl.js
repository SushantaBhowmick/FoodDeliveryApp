const User = require("../models/userModel")

exports.createUser =async(req,res)=>{
    try {
        const user = await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: req.body.password,
        })

        res.status(201).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error
        })
    }
}