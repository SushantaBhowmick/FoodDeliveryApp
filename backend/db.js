const mongoose = require("mongoose");

exports.connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((con)=>console.log(`Database Connected to : ${con.connection.host}`)
    
    )
    .catch((err)=>console.log(err))
}

// const mongoDB = () => {
//      mongoose.connect(process.env.MONGO_URL,
//         { useNewUrlParser: true })
//         .then
// }

// module.exports = mongoDB;