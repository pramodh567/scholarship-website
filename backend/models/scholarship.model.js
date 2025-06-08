import mongoose from "mongoose";

const detailschema= new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    cpa_requriements:{
      type: Number,
      required: true
    },
    award:{
      type:Number,
      required:true
    },
    link:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true
  }
);

const scholarship=mongoose.model('Scholarship',detailschema);
export default scholarship;