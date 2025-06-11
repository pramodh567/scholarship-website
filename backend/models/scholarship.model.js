import mongoose from "mongoose";

const detailschema= new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    link:{
      type:String,
      required:true
    },
    gpa:{
      type: Number,
      default:0
    },
    award:{
      type: String,
      required:true
    },
    deadline:{
      type: String,
      required:true
    }
  },
  {
    timestamps: true
  }
);

const scholarship=mongoose.model('Scholarship',detailschema);
export default scholarship;