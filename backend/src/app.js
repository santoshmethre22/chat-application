import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); 




app.get("/",(req,res)=>{
    res.send("hello this is backend");
})

// Importing routes
import authRoutes from "./routers/auth.route.js";

app.use("/api/v1/auth",authRoutes);



export {app};