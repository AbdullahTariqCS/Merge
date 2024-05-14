const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');


router.get('/index', sessionController.index);
router.get('/sidebar', sessionController.sidebar);

module.exports = router;
