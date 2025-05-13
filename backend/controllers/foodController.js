import foodModel from "../models/foodModel.js";
import fs from 'fs'; // Import the fs module

const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file uploaded" });
        }

        const image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        const savedFood = await food.save();
        res.status(201).json({ success: true, message: "Food Added", food: savedFood });

    } catch (error) {
        console.error("Error adding food:", error);

        if (error.name === 'ValidationError') {
            res.status(400).json({ success: false, message: "Validation Error", error: error.errors });
        } else {
            res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }
};

const listFood = async (req, res) => { // listFood defined at the top level
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error listing food:", error); // Use console.error for errors
        res.status(500).json({ success: false, message: "Server Error", error: error.message }); // Send 500 status
    }
};
//remove food item
const removeFood =async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"Food Removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}


export { addFood, listFood,removeFood }; // Correct export