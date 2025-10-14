import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    UserName:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
});

export default mongoose.model("User", UserSchema); 
