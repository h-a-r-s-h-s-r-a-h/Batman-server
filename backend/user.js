import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
  },
  {
    collection: "UserInfo",
  }
);

export const UserInfo = mongoose.model("UserInfo", UserDetailsSchema);
