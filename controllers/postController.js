import postModel from "../models/postModel.js"
import cloudinary from "../utils/cloudinary.js"

// creating post
export const createPost = async (req, res) => {
    const { username, title, desc, image, category } = req.body
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "bloggingPost"
        })
        const post = await postModel.create({
            username, title, desc, category,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
        });
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//get single post
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
            const post = await postModel.findById(id)
            res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// update post
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id);
    const { username } = req.body;
    try {
        if (post.username === username) {
            const currentPost = await postModel.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(currentPost)
        } else {
            res.status(400).json("you cant update others post")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// delete post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id);
    const { username } = req.body;
    try {
        if (post.username === username) {
            await postModel.findByIdAndDelete(id);
            res.status(200).json("deleted sucessfully")
        } else {
            res.status(400).json("you cant delete others post")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get all posts
export const getAllPost = async (req, res) => {
    const username = req.query.user
    try {
        let post;
        if (username) {
            post = await postModel.find({ username });
        } else (
            post = await postModel.find()
        )
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// like and unlike posts
export const likePost = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id)
    const { username } = req.body;

    try {
        if (!post.likes.includes(username)) {
            await post.updateOne({ $push: { likes: username } })
            res.status(200).json("post likes sucessfully")
        } else {
            await post.updateOne({ $pull: { likes: username } })
            res.status(200).json("post unlikes sucessfully")
        }
    } catch (error) {

    }
}
//comments


