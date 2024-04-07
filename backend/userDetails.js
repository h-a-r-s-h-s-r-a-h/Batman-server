import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String,
    userType: String,
    age: String,
    sex: String,
    degree: String,
    collegeDetails: String,
    languageSpoken: String,
    addressOfClinic: String,
    speciality: String,
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
