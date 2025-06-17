
import express from "express";
import {signup,login,logout,getUser} from "../controllers/auth.controller.js"
import { verify } from "../middleware/verify.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-user",verify,getUser);
export default router;

