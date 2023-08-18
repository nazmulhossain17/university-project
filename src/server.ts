import app from "app";
import config from "config";
import mongoose from "mongoose";

const connectDB = async () => {
  if (config.dbURL) {
    try {
      await mongoose.connect(config.dbURL);
      console.log("Database Connected");
      app.listen(config.Port, () => {
        console.log(`Server running on port ${config.Port}`);
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Database URL is undefined.");
  }
};

connectDB();
