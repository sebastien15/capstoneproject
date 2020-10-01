import Blog from "../models/blog";

//handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code)
}


const index =  (req,res)=>{
    console.log('working')
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
const singleBlog =  async (req,res)=>{
    const id = req.params.id
    try{
        const blog = await Blog.findById(id)
        // res.set('Content-Type', 'image/jpeg');
        res.send(blog);
    }catch(err){
        console.log(err);
    }
}
const deleteBlog =  (req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(result=>{res.json({ redirect:'/'})})
}
const updateBlog = async (req,res)=>{
    const id = req.params.id;
    const {title,body,photo} = req.body;
    try{
        const blog = await Blog.findByIdAndUpdate(id,{title,body,photo});
        res.status(400).json(blog)
    }catch (err){
        console.log(err)
    }
}
module.exports = {
    addBlog,
    index,
    updateBlog,
    deleteBlog,
    singleBlog
}