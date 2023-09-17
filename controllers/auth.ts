import { Request, Response } from "express";
import Auth from "../models/Auth";
import nodemailerFunc from "../nodemailer/nodemailer";
import { registerMsg } from "../nodemailer/msgs";

export const register = async (req: Request, res: Response): Promise<void> => {
  const user = await Auth.create({ ...req.body }); // already saved to db here
  // _id is now accessible for the res

  // res for user
  const token = user.createJWT();

  const { email } = req.body;
  // nodemailerFunc(registerMsg, email);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  const user = await Auth.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }
  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  res.status(200).json({ token });
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    path: "/",
  });

  res.status(200).json({ msg: "Logged Out Successfully" });
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  user.password = password;
  const token = user.createJWT();
  await user.save();

  res.status(200).json({ token });
};
