const express = require('express')
const router = express.Router();
import ImageProcessor from "../middlewares/blogImageProcessor";
import upload from "../config/multerConfig";
import blogController from "../controllers/blogController";
import contactController from '../controllers/contactController';
import commentController from "../controllers/commentController";

// app routes
router.get('/',(req,res)=>{res.render('index')})
router.get('/contact',(req,res)=>{res.render('pages/contact')})
router.get('/blog',(req,res)=>{res.render('pages/blog')})
router.get('/single-blog',(req,res)=>{res.render('pages/single-blog')})
router.get('/dashboard',(req,res)=>{res.render('pages/dashboard')})

// blog routes

router.get('/api/blogs',blogController.index);
router.post('/api/blogs',upload.single('photo'),ImageProcessor,blogController.addBlog)
router.delete('/api/blogs/:id',blogController.deleteBlog)
router.put('/api/blogs/:id',upload.single('photo'),ImageProcessor,blogController.updateBlog)
router.get('/api/blogs/:id',blogController.singleBlog)



//contact routes

router.get('/api/contacts',contactController.index);
router.post('/api/contacts',contactController.saveContact);
router.delete('/api/contacts/:id',contactController.deleteContact);

//comment routes
router.get('/api/Comments', commentController.allComments);
router.post('/api/Comments', commentController.saveComment);



module.exports = router;