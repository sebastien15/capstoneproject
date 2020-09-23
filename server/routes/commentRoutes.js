const express = require('express');
const router = express.Router();
import commentController from "../controllers/commentController";


router.get('/allComments', commentController.allComments);
router.post('/addComment', commentController.saveComment);
// router.delete('/deleteComment/:id', commentController.deleteComment);


module.exports = router;