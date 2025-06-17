import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        if (!email || !fullName || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            fullName,
            password: hashedPassword
        });

        await user.save(); // save first

       const token= generateToken(user._id, res); // then generate token

       if(!token){
           return res.status(500).json({
               success: false,
               message: "Failed to generate token"
           });
       }


        const userData = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        };

        return res.status(201).json({
            success: true,
            user: userData,
            message: "User created successfully"
        });

    } catch (error) {
        console.error("Error occurred during signup:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const login = async (req, res) => {
   try {

    const {email,password}=req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user =await User.findOne({email});

    if(!user){
        return res.status(404).json({ success: false, message: "User not found" });
    } 

    const isPass=await bcrypt.compare(password,user.password);

    if(!isPass){
        return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id, res);
    if(!token){
        return res.status(500).json({
            success: false,
            message: "Failed to generate token"
        });
    }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user:{
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            }
        });

   } catch (error) {
       console.error("Error occurred during login:", error);
       res.status(500).json({ success: false, message: "Internal server error" });
   }
    
}

export const logout = async (req, res) => {
 try {
            res.cookie("tokent","",{
                maxAge:0
            })
            res.status(200).json({
                success:true,
                message:"Logged out successfully"
            })
    } catch (error) {
        console.error("Error occurred during logout:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }


}

export const updateProfile = async (req, res) => {
        try {
            
            const {profilePic }=req.body;
            const userId =req.user._id;

            if (!profilePic) {
                return res.status(400).json({ success: false, message: "Profile picture is required" });
            }

            const uploadres=await cloudinary.uploader.upload(profilePic);
            console.log(uploadres);
            const updateUser=await User.findByIdAndUpdate(userId,{
                profilePic:uploadres.secure_url
            },
            {
                new:true
            }

        )

        } catch (error) {
            console.error("Error occurred during profile update:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
}


export const getUser=async(req,res)=>{
    try {
        const user =req.user;
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).
        json({
            success:true,
            message:"User fetched successfully",
            user:user
        })

    } catch (error) {
        console.error("Error occurred during user fetch:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
    
