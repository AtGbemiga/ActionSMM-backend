import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  if (err.message === "Please provide email and password") {
    statusCode = 400;
  } else if (
    err.message === "Invalid Credentials" ||
    err.message === "Authentication Invalid"
  ) {
    statusCode = 401;
  }
  res.status(statusCode).json({ error: err.message });
};
