import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './routes/Auth.js';
import levelRoute from './routes/Levels.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
const mongoUrl = process.env.MONGODB_URL || '';

mongoose.connect(mongoUrl).then(()=>{
    console.log('connected mongo')
}).catch(()=>{
    console.log('error mongo')
})

app.use(express.json());
app.use(cors());
app.use('/api/auth',auth);
app.use('/api/levels',levelRoute);

app.listen(port,()=>{
    console.log('hello world');
    console.log(port);
})