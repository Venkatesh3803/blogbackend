import express from "express"
import { deleteUser, followUser, getAllUsers, unfollowUser, updateUser } from "../controllers/userController.js"

const router = express.Router()
router.get("/", getAllUsers)

router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/follow/:id", followUser)
router.post("/unfollow/:id", unfollowUser)

export default router