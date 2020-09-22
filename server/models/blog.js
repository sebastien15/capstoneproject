import mongoose from "mongoose";
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    // photo: {
    //     type: Buffer
    // }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;