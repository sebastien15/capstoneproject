import express from "express";
const router = express.Router();

import blogController from "../controllers/blogController";

router.get('/all-blogs',blogController.index);

module.exports = router;