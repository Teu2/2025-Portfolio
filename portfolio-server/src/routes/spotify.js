const express = require('express');
const router = express.Router();
const controller = require('../controllers/spotifyController');

router.get('/', controller.root);
router.get('/spotify/login', controller.login);
router.get('/spotify/callback', controller.callback);
router.get('/spotify/status', controller.status);
router.get('/spotify/currently-playing', controller.currentlyPlaying);
router.get('/spotify/recently-played', controller.recentlyPlayed);
router.get('/spotify/health', controller.health);

module.exports = router;  