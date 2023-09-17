import express, { Request, Response } from "express";
const app = express();
require("dotenv").config();
import "express-async-errors";
import connectDB from "./db/connect";
// accessRoute middleware
import { accessRoute } from "./middleware/accessRoute";
// routers
import authRouter from "./routes/auth";
import planRouter from "./routes/plan";

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): void => {
  res.send("<h1>Hello World!</h1>");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/plan", accessRoute, planRouter);

const PORT = 3000;

app.listen(PORT, async (): Promise<void> => {
  if (typeof process.env.MONGO_URI === "undefined") {
    throw new Error("MONGO_URI is not defined");
  }
  await connectDB(process.env.MONGO_URI);
  console.log(`Server is running on port ${PORT}...`);
});
