import express, { Request, Response } from "express";
const app = express();
import "dotenv/config";
import helmet from "helmet";
import "express-async-errors";
import connectDB from "./db/connect";
import cors from "cors";
// accessRoute middleware
import { accessRoute } from "./middleware/accessRoute";
// error handler middleware
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
// routers
import authRouter from "./routes/auth";
import planRouter from "./routes/plan";
import payStackRouter from "./routes/paystack";
import profileRouter from "./routes/profile";
import TokenRelatedRouter from "./routes/adminOnly/tokenRelated";
import WebSocket from "ws";
import http from "http";

/**
 * aim
 * recieve the message from the sender
 * save to the database
 * send the message to the receiver
 */

// create server
const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
});

wss.on("error", (error) => {
  console.error(error);
});

wss.on(
  "connection",
  function connection(ws: WebSocket, request: Request, client: string) {
    ws.on("error", console.error);

    ws.on("message", function message(data) {
      console.log(`Received message ${data} from user ${client}`);
    });

    server.on("upgrade", function upgrade(request, socket, head) {
      socket.on("error", console.error); // TODO: Replace with a function that reports the error

      // This function is not defined on purpose. Implement it with your own logic.
      // authenticate(request, function next(err, client) {
      //   if (err || !client) {
      //     socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      //     socket.destroy();
      //     return;
      //   }

      //   socket.removeListener("error", console.error);

      //   wss.handleUpgrade(request, socket, head, function done(ws) {
      //     wss.emit("connection", ws, request, client);
      //   });
      // });
    });

    ws.send("something");
  }
);

app.set("trust proxy", 1);

// cors
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5500", // for admin
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// body parsing middleware / other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// routes
app.get("/", (req: Request, res: Response): void => {
  res.send("<h1>Hello World!</h1>");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/plan", accessRoute, errorHandler, planRouter);
app.use("/api/v1/paystack", payStackRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/admin", TokenRelatedRouter);

// 404 error handler middleware
app.all("*", notFound);

const PORT = process.env.PORT || 4192;

server.listen(PORT, async (): Promise<void> => {
  if (typeof process.env.MONGO_URI === "undefined") {
    throw new Error("MONGO_URI is not defined");
  }
  await connectDB(process.env.MONGO_URI);
  console.log(`Server is running on port ${PORT}...`);
});
