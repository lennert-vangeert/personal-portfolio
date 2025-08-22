import express from "express";
import { checkChat, sendChatMessage } from "./Chat.controller";

const router = express.Router();

router.post("/chat", sendChatMessage);
router.get("/chat/test", checkChat);

export { router as chatRoutes };
