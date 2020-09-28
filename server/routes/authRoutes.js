const { Router } = require('express');
const authControllers = require('../controllers/authController')
const router = Router();

router.get('/signup', authControllers.signup_get);
router.post('/signup', authControllers.signup_post);

module.exports = router;