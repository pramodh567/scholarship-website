import express from 'express';
import { connectdb } from './database.js';
import dotenv from 'dotenv';
import Test from './models/test.model.js';
import mongoose from 'mongoose';


const app=express();
app.use(express.json());
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
  connectdb();
  console.log('listening at the port '+PORT);
});