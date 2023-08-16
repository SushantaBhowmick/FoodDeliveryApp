const express = require('express');
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error")
const { connectDB } = require('./db');
const userRoute = require('./routes/userRoutes.js')
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

//db conection
connectDB();

//middlewares
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(express.json())

//routes
app.use('/api/user',userRoute)

app.use(errorMiddleware)

app.listen(PORT,()=>{
    console.log(`Server is Working on ${PORT}`)
})