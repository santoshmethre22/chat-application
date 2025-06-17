import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors());
app.use(express.json()); 

app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("hello this is backend");
})

// Importing routes
import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/message",messageRoutes);


export {app};