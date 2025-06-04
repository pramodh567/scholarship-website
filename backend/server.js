import express from 'express';
import { connectdb } from './database.js';
import dotenv from 'dotenv';


const app=express();
const PORT=process.env.PORT||3000;

app.get('/',(req,res)=>{
  res.send('hello world');
});

app.listen(PORT,()=>{
  connectdb();
  console.log('hi my name is pramodh');
});