import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import path from "path";
import { fileURLToPath } from 'url'; // Import fileURLToPath
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'


// Get the directory name using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// Define the uploads directory path
const uploadsDir = path.join(__dirname, "uploads");

// api endpoints
app.use("/api/food", foodRouter);

// Serve static files from the "uploads" directory
app.use("/images", express.static(uploadsDir));
app.use("/api/user",userRouter)

app.get("/", (req, res) => {
    res.send("API working");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});