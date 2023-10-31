import mongoose, { Schema, Types } from "mongoose";

interface IProfile {
  email?: object;
}

const ProfileSchema = new mongoose.Schema<IProfile>(
  {
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: [true, "Please provide Auth id"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);
