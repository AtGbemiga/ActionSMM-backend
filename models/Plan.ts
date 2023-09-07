import mongoose from "mongoose";

interface IPlan {
  planName: string;
  personalName: string;
  businessName: string;
  website?: string;
  aboutYourBusiness?: string;
  cta: string[];
  startDate: string;
  socialMediaPics?: string[];
  createdBy: object;
}

const PlanSchema = new mongoose.Schema<IPlan>(
  {
    planName: {
      type: String,
      enum: {
        values: [
          "starter",
          "pro",
          "supreme",
          "starterPlus",
          "proPlus",
          "supremePlus",
        ],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please provide plan name"],
    },
    personalName: {
      type: String,
      required: [true, "Please provide personal name"],
    },
    businessName: {
      type: String,
      required: [true, "Please provide business name"],
    },
    // make regex check for it to start with https:// or http://
    website: {
      type: String,
      // match: /^/,
    },
    aboutYourBusiness: String,
    cta: {
      type: [String],
      // cta must be greater than 1 and less than 100,000
      validate: {
        validator: function (value: string[]) {
          value.length > 1;
        },
      },
      message: `Must contain between 1 and 100,000 cta`,
    },
    startDate: {
      type: String,
      required: [true, "Must provide plan start date"],
      // regex that checks that the match matches the regex yyyy-mm-dd
      // match: /^/,
    },
    socialMediaPics: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IPlan>("Plan", PlanSchema);
