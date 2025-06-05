const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/chatbotController');
const requireHeader = require('../middleware/chatMiddleware');

router.post('/chatbot/chat', requireHeader, spotifyController.chat);

module.exports = router;  