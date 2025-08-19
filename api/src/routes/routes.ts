import { Express, Router } from "express";
import { chatRoutes } from "../modules/Chat/Chat.routes";
import { limiter } from "../middleware/rateLimiter";

const registerRoutes = (app: Express) => {
  app.use(limiter);
  app.get("/test", (req, res) => {
    res.send("Test route");
  });
  app.use("/", chatRoutes);
};

export { registerRoutes };
