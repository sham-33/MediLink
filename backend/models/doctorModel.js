import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    availabile: {
      type: Boolean,
      default: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctors", doctorSchema);

export default doctorModel;
// This model defines the structure of a doctor document in the MongoDB database.
// It includes fields for the doctor's name, email, password, image, speciality, degree, experience, about section, availability status, fees, address, date of registration, and slots booked.
