import Blog from "../models/blog";

const index =  (req,res)=>{
    Blog.find().then(result=>{res.send(result)})
    .catch(err=>{console.log(err)})
}

module.exports = {
    index
}