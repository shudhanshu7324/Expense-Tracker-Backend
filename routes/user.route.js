import express from "express";
import { registerUser,loginUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin",loginUser);

export default router;
