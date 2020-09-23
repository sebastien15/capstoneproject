import Comment from "../models/Comment";


const saveComment = async (req,res)=>{
    const {blogId,name,comment} = req.body;
    console.log(blogId,name,comment)
    console.log('working')
    try{
        const singleComment = await Comment.create({blogId,name,comment});
        res.send(singleComment);
    }catch(err){
        console.log(err)
    }
}

const allComments = async (req,res)=>{
    try {
        const comments= await Comment.find();
        res.send(comments);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    saveComment,
    allComments
    // deleteComment
}