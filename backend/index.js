const express = require('express');
const dotenv = require('dotenv');
// const mongoDB = require('./db');
const { connectDB } = require('./db');
const userRoute = require('./routes/userRoutes.js')
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

//db conection
connectDB();

//middlewares
app.use(express.json())

//routes
app.use('/api/user',userRoute)

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})

app.listen(PORT,()=>{
    console.log(`Server is Working on ${PORT}`)
})