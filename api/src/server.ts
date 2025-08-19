import "dotenv/config";
import app from "./app";
import { Server } from "http";
const port: number = parseInt(process.env.PORT ?? "9000");

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
server.on("SIGINT", () => stopServer(server));
server.on("SIGTERM", () => stopServer(server));

const stopServer = (server: Server) => {
  server.close(() => {
    console.log("Server closed");
    process.exit();
  });
};
