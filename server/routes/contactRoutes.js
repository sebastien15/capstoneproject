const express = require('express')
const router = express.Router();
const contactController = require('../controllers/contactController')

// router.get('/contacts',contactController.index);
router.post('/savecontact',contactController.saveContact);
// router.delete('/deleteContact/:id',contactController.deleteContact);

module.exports = router;