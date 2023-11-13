const Message = require('../models/messageModel');

// send message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, messageText } = req.body;
    const message = await Message.create({
      senderId: req.user._id,
      receiverId,
      messageText
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// get all messages
const getMessages = async (req, res) => {
    try {
      const userId = req.user._id;
      const messages = await Message.find({ receiverId: userId }).sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// get conversation
const getConversation = async (req, res) => {
    try {
      const { userId } = req.params; // User ID of the user to chat with
      const currentUserId = req.user._id; // Current user ID
      const messages = await Message.find({
        $or: [
          { senderId: currentUserId, receiverId: userId },
          { senderId: userId, receiverId: currentUserId }
        ]
      }).sort({ createdAt: 1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// mark as read
const markAsRead = async (req, res) => {
    try {
      const { messageId } = req.params;
      const message = await Message.findByIdAndUpdate(
        messageId,
        { isRead: true },
        { new: true }
      );
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    sendMessage,
    getMessages,
    getConversation,
    markAsRead
  };