import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    CartData:{type:Object,default:{}}
},{minimize:false})
//the condition below to create a model if  it's not created and to a model if it's already created
const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;