import { Request, Response } from "express";
import Plan from "../models/Plan";
import { upload } from "../multer/multer";
import cloudinary from "../cloudinary/cloudinary";
import multer from "multer";

export const addPlan = async (req: Request, res: Response) => {
  const simulateError = true; // Set this to true to simulate an error

  if (simulateError) {
    throw new Error("Simulated error during file upload");
  }

  upload.array("socialMediaPics", 5)(req, res, async (error) => {
    if (error) {
      if (error.message === "Unexpected field") {
        return res.status(400).json({ error: "Max of 5 images allowed" });
      }
      if (error instanceof multer.MulterError) {
        throw new Error(`${error}`);
      } else if (req.files === undefined) {
        console.log("No image uploaded but this should still work");
      } else if (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("An error occurred when uploading");
      }
    }

    const picturesUrl = [];

    for (const files of req.files as Express.Multer.File[]) {
      const uniqueIdentifier =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      // const publicId = `${req.user.userId}_smi_${uniqueIdentifier}`
      const publicId = `smi_${uniqueIdentifier}`;

      const result = await cloudinary.uploader.upload(files.path, {
        public_id: publicId,
        width: 500,
        height: 500,
        crop: "fill",
      });

      picturesUrl.push(result.secure_url);
    }

    req.body.socialMediaPics = picturesUrl;
    // req.body.createdBy = req.user.userId

    const plan = await Plan.create({ ...req.body });
    res.status(201).json({ plan });
  });
};
