import express from "express"
import { comment, deleteComment } from "../controllers/commentController.js";
import { createPost, deletePost, getAllPost, getPost, likePost, updatePost } from "../controllers/postController.js";


const router = express.Router();

router.post("/create", createPost)
router.get("/:id", getPost)
router.get("/", getAllPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.post("/like/:id", likePost)
router.post("/:id/comment", comment)
router.put("/:id/uncomment", deleteComment)


export default router