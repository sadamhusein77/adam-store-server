const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile, editProfile} = require('./controller');
const { isLoginPlayer } = require('../middleware/auth');
/* GET home page. */
router.get('/landing-page', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);
router.get('/profile', isLoginPlayer, profile);
router.put('/profile', 
    isLoginPlayer, 
    multer({ dest: os.tmpdir()}).single('image'), 
    editProfile
);

module.exports = router;
