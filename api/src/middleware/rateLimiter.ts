import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Limit each IP to 25 requests per `window`.
  message: JSON.stringify({
    error: "Too many requests from this IP, please try again after 15 minutes",
  }),
  skipFailedRequests: true
});
