import express from "express";

import { deletedetails, getdetails, getdetailsbyid, postdetails, updatedetails } from "../controller/scholarship.controller.js";

const Router=express.Router();

Router.get('/',getdetails);
Router.get('/:id',getdetailsbyid);
Router.post('/',postdetails);
Router.put('/:id',updatedetails);
Router.delete('/:id',deletedetails);

export default Router;