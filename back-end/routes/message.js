const express = require('express');
const { 
    sendMessage, 
    getMessages, 
    getConversation, 
    markAsRead 
} = require('../controllers/messageController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/send', requireAuth, sendMessage);
router.get('/getMessages', requireAuth, getMessages);
router.get('/getConversation/:userId', requireAuth, getConversation);
router.put('/markAsRead/:messageId', requireAuth, markAsRead);

module.exports = router;
