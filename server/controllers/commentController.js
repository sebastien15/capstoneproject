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

const deleteComment = (req,res)=>{
    const commentId = req.params.id
    // console.log(req.params.id)
    Comment.findOneAndDelete(commentId)
    .then(result=>{res.json(result)})
    .catch(err=>{console.log(err)})       
}

module.exports = {
    saveComment,
    allComments,
    deleteComment
}