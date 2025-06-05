import express from "express";

import { deletedetails, getdetails, getdetailsbyid, postdetails, updatedetails } from "../controller/tedst..controller.js";

const Router=express();

Router.get('/',getdetails);
Router.get('/:id',getdetailsbyid);
Router.post('/',postdetails);
Router.put('/:id',updatedetails);
Router.delete('/:id',deletedetails);

export default Router;