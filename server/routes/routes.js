const express = require('express')
const router = express.Router();
const contactController = require('../controllers/contactController')
import ImageProcessor from "../middlewares/blogImageProcessor";
import upload from "../config/multerConfig";
import blogController from "../controllers/blogController";
import {requireAuth} from "../middlewares/authenticate";

// page routers
router.get('/',(req,res)=>{ res.render('index')});
router.get('/contact',(req,res)=>{res.render('pages/contact')});
router.get('/blog',(req,res)=>{res.render('pages/blog')});
router.get('/blogSingle',(req,res)=>{res.render('pages/blogSingle')});

// app routes
router.get('/',(req,res)=>{res.render('index')})
router.get('/contact',(req,res)=>{res.render('pages/contact')})
router.get('/blog',(req,res)=>{res.render('pages/blog')})
router.get('/single-blog',(req,res)=>{res.render('pages/single-blog')})
router.get('/dashboard',requireAuth,(req,res)=>{res.render('pages/dashboard')})

// blog routes

router.get('/all-blogs',blogController.index);
router.post('/add-blog',requireAuth,upload.single('photo'),ImageProcessor,blogController.addBlog)
router.delete('/deleteBlog/:id',requireAuth,blogController.deleteBlog)
router.put('/updateBlog/:id',requireAuth,upload.single('photo'),ImageProcessor,blogController.updateBlog)
router.get('/single-blog/:id',blogController.singleBlog)

//contact routes

router.post('/savecontact',contactController.saveContact);




module.exports = router;