import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import { connect } from "mongoose";
import dotenv from "dotenv";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
dotenv.config();

//app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/admin", adminRouter); //localhost:4000/api/admin/add-doctor
app.get("/", (req, res) => {
  res.send("API WORKING again");
});

app.listen(port, () => console.log("server started", port));
