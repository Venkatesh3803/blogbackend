import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/usermodel.js"

// registering user
export const register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpass;
    const newUser = new UserModel(req.body);
    const { username } = req.body;

    try {
        const oldUser = await UserModel.findOne({ username });
        if (oldUser) {
            return res.status(401).json({ message: "this username is already exits" })
        }

        const user = await newUser.save();

        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_TOKEN, { expiresIn: "1h" })
        res.status(200).json({ user, token, message: "Registerd Sucessful" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// login user
export const loginUser = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email })
    try {
        if (user) {
            const validity = await bcrypt.compare(req.body.password, user.password)
            if (validity) {
                const login = await UserModel.findOne(user)

                const token = jwt.sign({
                    username: login.username, id: login._id
                }, process.env.JWT_TOKEN, { expiresIn: "1h" })


                const { password, isAdmin, ...others } = login._doc
                res.status(200).json({ others, token, message: "Login Sucessful" })
            } else (
                res.status(401).json({ message: "invalid credentials" })
            )
        } else {
            res.status(401).json({ message: "user does not exist" })
        }

    } catch (error) {
        res.status(401).json({ message: error.message })

    }
}

