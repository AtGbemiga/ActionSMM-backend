import { NextFunction, Request, Response } from "express";
import Plan from "../models/Plan";
import { upload } from "../multer/multer";
import cloudinary from "../cloudinary/cloudinary";
import multer from "multer";

export const getPlan = async (req: Request, res: Response): Promise<void> => {
  // get plans created by user
  const plan = await Plan.find({ createdBy: req.user?.authId });
  const count = await Plan.countDocuments({ createdBy: req.user?.authId });
  res.status(200).json({ plan, count });
};

export const addPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // res.json(req.user);
  upload.array("socialMediaPics", 5)(req, res, async (error) => {
    if (error) {
      if (error.message === "Unexpected field") {
        res.status(400).json({ error: "Max of 5 images allowed" });
      }
      if (error instanceof multer.MulterError) {
        throw new Error(`${error}`);
      } else if (req.files === undefined) {
        console.log("No image uploaded but this should still work");
      } else {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("An error occurred when uploading");
      }
    }

    const picturesUrl = [];

    for (const files of req.files as Express.Multer.File[]) {
      const uniqueIdentifier =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      const publicId = `${req.user?.authId}_smi_${uniqueIdentifier}`;

      const result = await cloudinary.uploader.upload(files.path, {
        public_id: publicId,
        width: 500,
        height: 500,
        crop: "fill",
      });

      picturesUrl.push(result.secure_url);
    }

    req.body.socialMediaPics = picturesUrl;
    req.body.createdBy = req.user?.authId;

    // convert the plan name sent by frontend to what's understood by the backend
    switch (req.body.planName) {
      case "Starter":
        req.body.planName = "starter";
        break;
      case "Pro":
        req.body.planName = "pro";
        break;
      case "Supreme":
        req.body.planName = "supreme";
        break;
      case "Starter%20Plus":
        req.body.planName = "starterPlus";
        break;
      case "Pro%20Plus":
        req.body.planName = "proPlus";
        break;
      case "Supreme%20Plus":
        req.body.planName = "supremePlus";
        break;
      default:
        req.body.planName = "";
        break;
    }

    const plan = await Plan.create({ ...req.body });
    res.status(201).json({ plan });
  });
};

/* Admin only functionality */
export const updatePlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  // get the id of the plan from the req
  const planId = req.params.id;
  // get the authId of the user
  const authId = req.user?.authId;

  // filter for findOneAndUpdate
  const filter = { _id: planId };
  // update for findOneAndUpdate
  const update = { ...req.body };

  // check and attempt to update
  if (req.user?.role === "Official") {
    const plan = await Plan.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });

    // handle if no plan found
    if (!plan) {
      throw new Error("Plan not found with id " + planId);
    }

    res.status(200).json({ plan });
  } else {
    // handle if user is not an official
    res.status(401).json({ error: "Unauthorized" });
  }
};

// get plans associated with by ID from email
export const adminGetPlansByIdFromEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  // return unauthorized error if user role is Account holder
  if (req.user?.role === "Account holder") {
    console.log(req.user.authId);

    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    // find the user from the params id
    const authId = req.params.id;

    // find the plans associated with the Id
    const plans = await Plan.find({ createdBy: authId });
    const count = await Plan.countDocuments({ createdBy: authId });
    res.status(200).json({ plans, count });
  }
};

// get one plan
export const getOnePlan = async (req: Request, res: Response) => {
  const plan = await Plan.findById(req.params.id);
  console.log(req.params.id);

  // handle if no plan found
  if (!plan) {
    res.status(404).json({ error: "Plan not found with id " + req.params.id });
  }

  res.status(200).json({ plan });
};
