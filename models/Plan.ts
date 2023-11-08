import mongoose from "mongoose";

interface IPlan {
  planName: string; // add enum type here
  personalName: string;
  businessName: string;
  website?: string;
  aboutYourBusiness: string;
  cta: string[];
  startDate: string;
  dueDate: string;
  socialMediaPics?: FileList;
  status: "Processing" | "Active" | "Expired" | "Declined" | "Refunded";
  chat?: string[];
  accounts: {
    one?: string;
    two?: string;
    three?: string;
    four?: string;
  };
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
    website: {
      type: String,
      match: /^([https?]{4,5}):\/\/(www)?\.?(.+)\.([a-z]{2,5})(\.[a-z]+)?$/i,
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
      // regex that matches mongodb date format
      match: [/^\d{4}-\d{2}-\d{2}T23:00:00\.000Z/, "Must be a valid date"],
    },
    socialMediaPics: [String],
    dueDate: {
      type: String,
      required: [true, "Must provide plan due date"],
      // regex that matches mongodb date format
      match: [/^\d{4}-\d{2}-\d{2}T23:00:00\.000Z/, "Must be a valid date"],
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
    accounts: {
      one: {
        type: String,
        // regex that matches facebook page url
        //match: /^/
      },
      two: {
        type: String,
        // regex that matches IG page url
        //match: /^/
      },
      three: {
        type: String,
        // regex that matches linkedin page url
        //match: /^/
      },
      four: {
        type: String,
        // regex that matches x page url
        //match: /^/
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: [true, "Please provide Auth id"],
    },
  },

  { timestamps: true }
);

// prints in the terminal Not in Postman
// PlanSchema.pre("save", function () {
//   const { facebook, instagram, linkedin, x } = this.accounts;
//   if (
//     facebook === undefined &&
//     instagram === undefined &&
//     linkedin === undefined &&
//     x === undefined
//   ) {
//     throw new Error("provided.");
//   }
// });

export default mongoose.model<IPlan>("Plan", PlanSchema);
