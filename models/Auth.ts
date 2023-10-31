import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IAuth {
  email: string;
  password: string;
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AuthSchema = new mongoose.Schema<IAuth>(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      maxlength: 64,
    },
  },
  { timestamps: true }
);

// hash password
AuthSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create jwt
AuthSchema.methods.createJWT = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in your environment.");
  }
  return jwt.sign({ authId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// compare password
AuthSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model<IAuth>("Auth", AuthSchema);
