import { Request, Response, NextFunction } from "express";
import Auth from "../models/Auth";
import nodemailerFunc from "../nodemailer/nodemailer";
import { registerMsg } from "../nodemailer/msgs";

// if the role is Account holder. Send back a cookie that expires in 60 days, if the role is official send back a cookie that expires in 1 day
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
    secure: true,
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

  if (role === "Account holder") {
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({ token, email, role });
    return;
  } else {
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({ token, email, role });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    path: "/",
  });

  res.status(200).json({ msg: "Logged Out Successfully" });
};

// no cookie is sent in this response. Look into it
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

/* Admin only functionality */

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

/**
 * Admin dashboard tought process
 * login
 * see emails. Click on an account email
 * see plans associated with the account. Click on a plan
 * see plan details. Edit any part of it such as status or chat
 *
 */

// get all accounts. Can't work for frontend because it gets all the emails in db.
export const getAllAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  // if user is an Account holder. Send back an unauthorized response
  if (req.user?.role === "Account holder") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    // send back all accounts and the plans associated with them

    const accounts = await Auth.find({}, "email"); // send back only the email field
    const count = await Auth.countDocuments({});

    res.status(200).json({ accounts, count });
  }
};
