const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/chatbotController');
const requireHeader = require('../middleware/chatMiddleware');

router.post('/chatbot/chat', requireHeader, spotifyController.chat);
router.get('/chatbot/health', requireHeader, spotifyController.health);

module.exports = router;  