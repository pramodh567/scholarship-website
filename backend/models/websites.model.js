import mongoose from "mongoose";

const Newschema= new mongoose.Schema({
    website:{
      type:String,
      required:true
    },
    link:{
      type:String,
      required:true
    },
    isvalid:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true
  }
);

const NewAdd=mongoose.model('website',Newschema);
export default NewAdd;