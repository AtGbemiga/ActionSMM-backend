import { Request, Response } from "express";

// 404 error handler
export const notFound = (req: Request, res: Response) =>
  res.status(404).json({ error: "Route not found" });
