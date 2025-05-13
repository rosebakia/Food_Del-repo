import userModel from "../models/userModel.js"; // Corrected import (add .js)
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Get email and password from request body

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);

        res.status(200).json({ success: true, user, token });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (!password || password.length < 8) { // Check if password is defined
            return res.status(400).json({ success: false, message: "Please enter a strong password (at least 8 characters)" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name, // Shorthand property names
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id); // Create token after successful registration

        res.status(201).json({ success: true, user, token }); // 201 Created status code

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser };