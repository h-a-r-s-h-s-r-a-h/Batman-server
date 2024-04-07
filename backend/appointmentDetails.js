import mongoose from "mongoose";

const AppointmentDetailsSchema = new mongoose.Schema(
  {
    userId: String,
    DoctorId: String,
    dateOfAppointment: String,
    timeOfAppointment: String,
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
  },
  {
    collection: "AppointmentInfo",
  }
);

export const AppointmentInfo = mongoose.model(
  "AppointmentInfo",
  AppointmentDetailsSchema
);
