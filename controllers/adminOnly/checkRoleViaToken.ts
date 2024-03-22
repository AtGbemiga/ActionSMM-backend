import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const checkRoleViaToken = (req: Request, res: Response) => {
  // get the token from the headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  } else {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        const { role } = decoded as { role: string };

        if (role === "Account holder") {
          res.status(401).json({ message: "Unauthorized" });
        } else {
          res.status(200).json({ role });
        }
      }
    });
  }
};
