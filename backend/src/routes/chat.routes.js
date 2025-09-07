const express = require("express");
const authMiddlewares = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");

const router = express.Router();

router.post("/", authMiddlewares.authUser, chatController.createChat);
router.get("/", authMiddlewares.authUser, chatController.getChat);
router.get(
  "/message/:id",
  authMiddlewares.authUser,
  chatController.getMessages
);

module.exports = router;
