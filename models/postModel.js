import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    likes: {
        type: [],
    },
    category: {
        type: String
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    comments: {
        type: [{
            username: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }],
    },

}, { timestamps: true })

const postModel = mongoose.model('posts', postSchema);
export default postModel