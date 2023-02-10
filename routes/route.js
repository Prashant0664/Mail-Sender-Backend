const express = require('express');
const { sign } = require('../controllers/main')
const { report } =require('../controllers/admin')
const router = express.Router();

router.post('/signup', sign)
router.post('/report', report)

module.exports = router;

