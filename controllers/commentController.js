import postModel from "../models/postModel.js";

export const comment = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id)
    try {
        if (!post.comments.includes(req.body.username)) {
            await post.updateOne({ $push: { comments: req.body } })
            res.status(200).json("posted comment")
        } else {
            res.status(403).json("you cannot comment")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}
export const deleteComment = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id)

    try {
        if (post.comments.includes(req.body.username)) {
            await post.updateOne({ $pull: { comments: req.body } })
            res.status(200).json("comment removed")
        } else {
            res.status(403).json("you cannot comment")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}