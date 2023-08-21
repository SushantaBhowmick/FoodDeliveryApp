const catchAsyncErr = require("../middlewares/catchAsyncErr");
const Order = require('../models/orderModel')

exports.orders=catchAsyncErr(async(req,res,next)=>{
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    if (eId===null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

exports.myOrders = catchAsyncErr(async(req,res,next)=>{
    const  {email} = req.body;
   
        let myData = await Order.findOne({email});
        res.json({
            orderData:myData
        })

})