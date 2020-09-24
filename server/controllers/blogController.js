import Blog from "../models/blog";

//handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code)
}


const index =  (req,res)=>{
    Blog.find().then(result=>{res.send(result)})
    .catch(err=>{console.log(err)})
}
const addBlog = async (req,res)=>{
    const {title,body,photo} = req.body;

    try{
        const blog = await Blog.create({title,body,photo})
        res.send(blog)
    }catch(err){
        handleErrors(err)
    }
}
module.exports = {
    addBlog,
    index
}