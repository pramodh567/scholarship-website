import mongoose from "mongoose";

const detailschema= new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    cpa:{
      type: Number,
      required: true
    },
    branch:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Test=mongoose.model('Scholarship',detailschema);
export default Test;