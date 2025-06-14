import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.get("/", (req, res) => {
  res.send("API WORKING again");
});

app.listen(port, () => console.log("server started", port));
