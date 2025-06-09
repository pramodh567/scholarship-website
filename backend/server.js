import express from 'express';
import { connectdb } from './database.js';
import dotenv from 'dotenv';
import routes from './routes/scholarship.routes.js';
import newwebsite from './routes/website.routes.js'
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());// parses the request into body and other . so ,need to use this before routes.
const PORT=process.env.PORT||3000;

app.use('/api/details',routes);
app.use('/api/create',newwebsite);

app.listen(PORT,()=>{
  connectdb();
  console.log('listening at the port '+PORT);
});