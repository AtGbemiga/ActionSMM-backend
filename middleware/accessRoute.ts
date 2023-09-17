import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        authId: string;
      };
    }
  }
}

export const accessRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessRouteHeader = req.headers.authorization as string;

  if (!accessRouteHeader || !accessRouteHeader.startsWith("Bearer ")) {
    return next(new Error("Authentication Invalid"));
  }

  const token = accessRouteHeader.split(" ")[1];

  try {
    if (process.env.JWT_SECRET === undefined) {
      throw new Error("JWT_SECRET is not defined");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = {
      authId: payload.authId,
    };
    next();
  } catch (error) {
    throw new Error("Internal Server Error, please try again");
  }
};
