import Comment from "../models/Comment";

const allComments = async (req,res)=>{
    try {
        const comments= await Comment.find();
        res.send(comments);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    // saveComment,
    allComments
    // deleteComment
}