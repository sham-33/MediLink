//API for adding doctor
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctorModel.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      image,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    //checking for all data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    //validating email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    //check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor with this email already exists" });
    }

    //validating password
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    //validating address format
    try {
      JSON.parse(address);
    } catch (e) {
      return res.status(400).json({ success: false, message: "Invalid address format" });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUrl = image; // default to image from request body if no file

    //uploading image to cloudinary if file exists
    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        imageUrl = imageUpload.secure_url;
      } catch (error) {
        return res.status(500).json({ success: false, message: "Error uploading image" });
      }
    }

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding doctor", error: error.message });
  }
};

export { addDoctor };
