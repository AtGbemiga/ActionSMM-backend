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

app.listen(PORT, async (): Promise<void> => {
  if (typeof process.env.MONGO_URI === "undefined") {
    throw new Error("MONGO_URI is not defined");
  }
  await connectDB(process.env.MONGO_URI);
  console.log(`Server is running on port ${PORT}...`);
});
