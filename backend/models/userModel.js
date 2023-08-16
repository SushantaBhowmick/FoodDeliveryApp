const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [3, "Name must be at least 3 character"],
        maxlength: [30, "Name can't exceed 30 character"],
    },
    location: {
        type: String,
        required: [true, "Please enter your location"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"]

    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [5, "Password must be at least 5 character"],
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('user', userSchema);