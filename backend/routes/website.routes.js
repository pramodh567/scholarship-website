import express from 'express'
import { AddWebsite, GetWebsites } from '../controller/website.controller.js';


const Router=express();

Router.post('/',AddWebsite);

Router.get('/',GetWebsites);

export default Router; 