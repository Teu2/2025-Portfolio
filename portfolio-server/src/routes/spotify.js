const express = require('express');
const router = express.Router();
const controller = require('../controllers/spotifyController');

router.get('/', controller.root);
router.get('/login', controller.login);
router.get('/callback', controller.callback);
router.get('/status', controller.status);
router.get('/currently-playing', controller.currentlyPlaying);
router.get('/recently-played', controller.recentlyPlayed);

module.exports = router;