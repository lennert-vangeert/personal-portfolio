import express from "express";
import { sendChatMessage } from "./Chat.controller";

const router = express.Router();

router.post("/chat", sendChatMessage);

export { router as chatRoutes };
