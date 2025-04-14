const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const { signup, signin } = require('./controller');

/* GET home page. */
router.post('/signup', multer({ dest: os.tmpdir()}).single('image'), signup);
router.post('/signin', signin);

module.exports = router;
