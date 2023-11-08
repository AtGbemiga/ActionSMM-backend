import { Request, Response, NextFunction } from "express";
import Auth from "../models/Auth";
import nodemailerFunc from "../nodemailer/nodemailer";
import { registerMsg } from "../nodemailer/msgs";

export const register = async (req: Request, res: Response): Promise<void> => {
  const user = await Auth.create({ ...req.body }); // already saved to db here
  // _id is now accessible for the res

  // res for user
  const token = user.createJWT();
  const role = user.role;
  const { email } = req.body;

  // nodemailerFunc(registerMsg, email);
  res.cookie("token", token, {
    httpOnly: true,
    // date interpretation days * hours * minutes * seconds * milliseconds
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  });

  res.status(201).json({ token, email, role });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error("Please provide email and password"));
  }
  const user = await Auth.findOne({ email });
  // get the users role
  const role = user?.role;
  if (!user) {
    return next(new Error("Invalid Credentials"));
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new Error("Invalid Credentials"));
  }
  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  });
  res.status(200).json({ token, email, role });
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    path: "/",
  });

  res.status(200).json({ msg: "Logged Out Successfully" });
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });

  if (!user) {
    return next(new Error("Invalid Credentials"));
  }

  user.password = password;
  const token = user.createJWT();
  await user.save();

  res.status(200).json({ token, email });
};

export const updateAccountRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, role } = req.body; // get email and new role from request body

  if (!email || !role) {
    res.status(400).json({ error: "Please provide email and role" });
  }
  const updatedUser = await Auth.findOneAndUpdate(
    { email }, // find user by email
    { role }, // update role
    { new: true } // return updated user
  );

  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(`User role updated to ${role}`); // send updated user as response
};
