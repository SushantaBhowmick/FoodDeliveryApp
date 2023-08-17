const catchAsyncErr = require("../middlewares/catchAsyncErr");

exports.displyData = catchAsyncErr(async(req,res,next)=>{
    res.send([global.foodData,global.foodCategory])
})