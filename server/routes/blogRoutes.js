import express from "express";
const router = express.Router();
import ImageProcessor from "../middlewares/blogImageProcessor";
import upload from "../config/multerConfig";

import blogController from "../controllers/blogController";

router.get('/all-blogs',blogController.index);
router.post('/add-blog',upload.single('photo'),ImageProcessor,blogController.addBlog)


module.exports = router;