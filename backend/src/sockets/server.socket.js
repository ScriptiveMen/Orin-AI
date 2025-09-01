const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");
const aiService = require("../services/ai.service");
const vectorService = require("../services/vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    if (!cookies) {
      next(new Error("Please provide token!"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication Error : Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (data) => {
      const [userMsg, messageVector] = await Promise.all([
        messageModel.create({
          user: socket.user._id,
          chat: data.chat,
          content: data.message,
          role: "user",
        }),

        aiService.generateVectors(data.message),
      ]);

      await vectorService.createMemory({
        messageId: userMsg._id,
        vectors: messageVector,
        metadata: {
          userId: socket.user._id,
          chatId: data.chat,
          text: data.message,
        },
      });

      const [memory, chatHistory] = await Promise.all([
        vectorService.queryMemory({
          queryVector: messageVector,
          limit: 3,
          metadata: {
            user: socket.user._id,
          },
        }),

        messageModel
          .find({
            chat: data.chat,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
          .then((messages) => messages.reverse()),
      ]);

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `
          These are the past chats, use them to generate a response.
          ${memory.map((item) => item.metadata.text).join("\n")}
          `,
            },
          ],
        },
      ];

      const response = await aiService.generateResponse([...ltm, ...stm]);

      socket.emit("ai-response", {
        content: response,
        chat: data.chat,
      });

      const [aiMsg, responseVector] = await Promise.all([
        messageModel.create({
          user: socket.user._id,
          chat: data.chat,
          content: response,
          role: "model",
        }),

        aiService.generateVectors(response),
      ]);

      await vectorService.createMemory({
        messageId: aiMsg._id,
        vectors: responseVector,
        metadata: {
          userId: socket.user._id,
          chatId: data.chat,
          text: response,
        },
      });
    });
  });
}

module.exports = initSocketServer;
