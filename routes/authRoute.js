import express from "express"
import { loginUser, register } from "../controllers/authController.js";

const router = express.Router()

router.post("/register", register)
router.put("/login", loginUser)

export default router