import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/medilink`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // optional: stop the app if DB connection fails
  }
};

export default connectDB;
