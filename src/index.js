// import mongoose from "mongoose";
// import DB_NAME from "./constants"
import * as dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js";


dotenv.config();

 
connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port : ${process.env.PORT}`);
        app.on("error", (error)=>{
            console.log("error", error);
            throw error
        })
    })
}).catch((err) => {
    console.log("MongoDB connection Failed !!!", err);

})












/*
import express from "express"
const app = express()
(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("error",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listning on port ${process.env.PORT}`);
            
        })
    }catch(error){
        console.log("ERROR", error);
        throw err
    }
})()
*/