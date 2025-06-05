const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');
const requireHeader = require('../middleware/spotifyMiddleware');

router.get('/', spotifyController.root);
router.get('/spotify/login', spotifyController.login);
router.get('/spotify/callback', spotifyController.callback);
router.get('/spotify/status', requireHeader, spotifyController.status);
router.get('/spotify/currently-playing', requireHeader, spotifyController.currentlyPlaying);
router.get('/spotify/recently-played', requireHeader, spotifyController.recentlyPlayed);
router.get('/spotify/health', requireHeader, spotifyController.health);

module.exports = router;  