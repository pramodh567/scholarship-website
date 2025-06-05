import mongoose from "mongoose";
import Test from '../models/test.model.js';

export const getdetails = async (req,res)=>{
  try{
    const list= await Test.find({});
    return res.status(200).json({success:true,data:list});
  }catch(e){
    console.error(e.message);
    return res.status(500).json({success:false,message:"internal server error"});
  }
};

export const getdetailsbyid = async (req,res)=>{
  const {id} =req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"the id does not have a corresponding id"});
  }
  try{
    const list= await Test.findById(id);
    return res.status(200).json({success:true,data:list});
  }catch(e){
    console.error(e.message);
    return res.status(500).json({success:false,message:"internal server error"});
  }
};

export const postdetails = async (req,res)=>{
  const detail=req.body;

  if(!detail.name||!detail.cpa||!detail.branch){
    return res.status(400).json({ success:false, message:"fill all the details !"});
  }

  const newdata=new Test(detail);
  try{
    await newdata.save();
    return res.status(201).json({ success:true,data:newdata});
  }
  catch(error){
    console.error("error while adding product ",error.message);
    return res.status(500).json({ success: false, message: "internal server error"});
  }
};

export const updatedetails = async(req,res)=>{
  const {id}=req.params;
  const update=req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"the id does not have a corresponding id"});
  }

  try {
    const updateproduct=await Test.findByIdAndUpdate(id,update,{new:true});
    return res.status(200).json({success:true,data:updateproduct});
  }
  catch (error) {
    console.error("cannot add the product ",error.message);
    return res.status(500).json({success:false,message:"internal server error"});
  }
};

export const deletedetails = async(req,res)=>{
  const { id }=req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"the id does not have a corresponding id"});
  }
  
  try{
    await Test.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"the details have been successfully deleted"});
  }
  catch(e){
    console.error("error while deleting details",error.message);
    return res.status(500).json({success:false,message:"internal server error"});
  }
};