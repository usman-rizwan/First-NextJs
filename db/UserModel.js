import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyPasswordToken: String,
    verifyPasswordTokenExpiry: String,
  },
  {
    timestamps: true,
  }
);

const User = models.nextusers || model("nextusers", userSchema);
export default User;
