import NewAdd from '../models/websites.model.js';

export const AddWebsite= async (req,res) => {
  const {website,link,github="",isvalid=false}=req.body;
  if(!website||!link){
    return res.status(400).json({success:false,message:"give correct details"});
  }
  const New_website=new NewAdd({website,link,github,isvalid});
  try {
    await New_website.save();
    return res.status(200).json({success:true,message:"the new website suggestion is given to the developper"});
  } catch (error) {
    console.error("error occured while adding the suggestion:",error.message);
    return res.status(500).json({success:false,message:"internal server error"});
  }
};

export const GetWebsites = async(req,res)=>{
  try {
    const data= await NewAdd.find({});
    return res.status(200).json({success:true,data:data});
  } catch (error) {
    console.error("there is a error while handling previous request",error.message);
    return res.status(500).json({success:false,message:"internal server error"});
  }
};