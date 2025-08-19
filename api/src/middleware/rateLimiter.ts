import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 1 request per `window` (here, per 15 minutes)
  message: `Too many requests from this IP, please try again after 15 minutes`,
  skipFailedRequests: true
});
