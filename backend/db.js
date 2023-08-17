const mongoose = require("mongoose");

// exports.connectDB = ()=>{
//     mongoose.connect(process.env.MONGO_URL)
//     .then((con)=>console.log(`Database Connected to : ${con.connection.host}`)
//     )
//     .catch((err)=>console.log(err))
// }

module.exports = function (callback) {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log(err)
        else {
            console.log("Database connected");
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("foodCategory");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};