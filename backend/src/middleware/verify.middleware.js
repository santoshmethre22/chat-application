import { User } from "../models/user.model";

export const verifyJwt=async(req,res,next)=>{
    try {

        const token=req.cookies.token

        if(!token){

            return res.status(400).json({
                success: false,
                message: "No token provided, please login again"
            })
        }

        const decodeToken= JsonWebTokenError.verify(token,process.env.SECRET_KEY);

        if(!decodeToken){

            return res.status(400).json({
                success: false,
                message: "Invalid token, please login again"
            })
        }

        const user =await User.findById(decodeToken?._id).select("-password -__v");

        if(!user){

            return res.status(400).json({
                success: false,
                message: "User not found, please login again"
            })
        }

        req.user=user;
        next();


    } catch (error) {
        console.error("Error in verification middleware:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }


}