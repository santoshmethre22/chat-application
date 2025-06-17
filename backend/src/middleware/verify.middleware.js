import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please login again.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please login again.",
      });
    }

    const user = await User.findById(decoded._id).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Error in verification middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
