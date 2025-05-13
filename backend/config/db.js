import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://rosebakia55:CT23A282@cluster0.mpr2l.mongodb.net/food-del').then(()=>console.log("DB connected"));
}
