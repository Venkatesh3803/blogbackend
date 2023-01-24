import UserModel from "../models/usermodel.js";
import postModel from "../models/postModel.js"
import bcrypt from "bcrypt"

export const getAllUsers = async (req, res) => {
    try {
        const user = await UserModel.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(200).json(error)
    }
}


// get single user
export const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id)
    try {
        if (user) {
            const currentUser = await UserModel(user)
            res.status(200).json(currentUser)
        } else {
            res.status(400).json("you dint register yet")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// update user

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id)
    try {
        if (user) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(user.password, salt)
            await UserModel.findByIdAndUpdate(id, req.body)
            res.status(200).json("updated sucessfullly")
        } else {
            res.status(400).json("you can update only your account")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id)
    try {
        if (user) {
            await UserModel.findOneAndDelete()
            res.status(200).json("deleted sucessfullly")
        } else {
            res.status(400).json("you can delete only your account")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// follow user

export const followUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body

    try {
        if (currentUserId === id) {
            res.status(401).json("Access denied")
        } else {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId);

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } })
                await followingUser.updateOne({ $push: { following: id } })
                res.status(200).json("you started following user")
            } else {
                res.status(500).json(" you already followed by you")
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body

    try {
        if (currentUserId === id) {
            res.status(401).json("Access denied")
        } else {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId);

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } })
                await followingUser.updateOne({ $pull: { following: id } })
                res.status(200).json("you unfollowed user")
            } else {
                res.status(400).json("you already unfollowed user")
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
