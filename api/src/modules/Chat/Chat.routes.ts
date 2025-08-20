import express from "express";
import { sendChatMessage } from "./Chat.controller";

const router = express.Router();

router.post("/chat", sendChatMessage);
router.get("/test", (req, res) => {
  res.json({
    message: "This is a test response",
  });
});

export { router as chatRoutes };
