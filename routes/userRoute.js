import express from "express"
import { deleteUser, followUser, getAllUsers, getUser, getUsersPost, unfollowUser, updateUser } from "../controllers/userController.js"

const router = express.Router()
router.get("/", getAllUsers)
router.get("/:id", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/follow/:id", followUser)
router.post("/unfollow/:id", unfollowUser)
router.get("/users/:id", getUsersPost)

export default router