import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


app.use("/", authRouter)
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database Connected'))
.catch((err)=>{console.log('Database not connected', err)})


const port = 8000;
app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`)
})