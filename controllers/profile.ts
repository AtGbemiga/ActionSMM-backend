import { Request, Response } from "express";
import Profile from "../models/Profile";

export const email = async (req: Request, res: Response) => {
  const profile = await Profile.find({ email: req.user?.authId });

  res.status(200).json({ profile });
};

export const createEmail = async (req: Request, res: Response) => {
  req.body.email = req.user?.authId;

  const profile = await Profile.create({ ...req.body });
  res.status(200).json({ profile });
};
