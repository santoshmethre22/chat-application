import express from "express";

const router =express.Router();

// todo : getMessages, getUsersForSidebar, sendMessage 

router.get("/getMessages",getMessages);
router.get("/getUsersForSidebar",getUsersForSidebar);
router.post("/sendMessage",sendMessage);

export default router;