import mongoose from "mongoose";

interface IPlan {
  planName: string;
  personalName: string;
  businessName: string;
  website?: string;
  aboutYourBusiness?: string;
  cta: string[];
  startDate: string;
  dueDate: string;
  socialMediaPics?: string[];
  status: "Processing" | "Active" | "Expired" | "Declined" | "Refunded";
  chat?: string[];
  accounts?: string[];
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
    // make regex check for w 0 or 3 times e.g http://www.a.com or http://a.com
    website: {
      type: String,
      match: /^https?:\/\/\w.*$/i,
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
      required: [true, "Must provide at least 1 cta"],
    },
    startDate: {
      type: String,
      required: [true, "Must provide plan start date"],
      // regex that checks that the match matches the regex yyyy-mm-dd
      // match: /^/,
    },
    socialMediaPics: [String],
    dueDate: {
      type: String,
      required: [true, "Must provide plan due date"],
      // regex that checks that the match matches the regex yyyy-mm-dd
      // match: /^/,
    },
    status: {
      type: String,
      default: "Processing",
      enum: {
        values: ["Processing", "Active", "Expired", "Declined", "Refunded"],
        message: "{VALUE} is not supported",
      },
    },
    chat: [String],
    // accounts: {
    //   facebook: {
    //     type: String,
    //     // regex that matches facebook page url
    //     //match: /^/
    //   },
    //   instagram: {
    //     type: String,
    //     // regex that matches IG page url
    //     //match: /^/
    //   },
    //   linkedin: {
    //     type: String,
    //     // regex that matches linkedin page url
    //     //match: /^/
    //   },
    //   x: {
    //     type: String,
    //     // regex that matches x page url
    //     //match: /^/
    //   },
    // },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: [true, "Please provide Auth id"],
    },
  },

  { timestamps: true }
);

export default mongoose.model<IPlan>("Plan", PlanSchema);
