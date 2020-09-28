const express = require('express');
const router = express.Router();
import commentController from "../controllers/commentController";


router.get('/allComments', commentController.allComments);
router.post('/addComment', commentController.saveComment);

module.exports = router;