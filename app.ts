import express, { Request, Response } from "express";
const app = express();
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";
import connectDB from "./db/connect";
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

// cors
app.use(helmet());
app.use(cors());

// Add this middleware before your other route handlers
app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://action-smm-backend.vercel.app"
  ); // Replace with the origin of your frontend
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).end();
});

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

// 404 error handler middleware
app.all("*", notFound);

const PORT = 3000;

app.listen(PORT, async (): Promise<void> => {
  if (typeof process.env.MONGO_URI === "undefined") {
    throw new Error("MONGO_URI is not defined");
  }
  await connectDB(process.env.MONGO_URI);
  console.log(`Server is running on port ${PORT}...`);
});
