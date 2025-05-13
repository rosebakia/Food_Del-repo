import express from "express"
import { addFood , listFood , removeFood} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();//with this we could import any other method http

//Image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage:storage})

//post reauest to send data to the server
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);




export default foodRouter;