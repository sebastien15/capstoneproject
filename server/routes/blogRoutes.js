import express from "express";
const router = express.Router();
import ImageProcessor from "../middlewares/blogImageProcessor";
import upload from "../config/multerConfig";

import blogController from "../controllers/blogController";

router.get('/all-blogs',blogController.index);
router.post('/add-blog',upload.single('photo'),ImageProcessor,blogController.addBlog)
router.delete('/deleteBlog/:id',blogController.deleteBlog)
router.put('/updateBlog/:id',upload.single('photo'),ImageProcessor,blogController.updateBlog)
router.get('/single-blog/:id',blogController.singleBlog)

module.exports = router;