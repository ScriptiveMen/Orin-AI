const chatModel = require("../models/chat.model");
async function createChat(req, res) {
  const { title } = req.body;

  const chat = await chatModel.create({
    title: title,
    user: req.user,
  });

  res.status(201).json({
    message: "Chat created sucessfully!",
    chat: {
      id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      user: chat.user,
    },
  });
}

module.exports = {
  createChat,
};
