const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected successfully!");
  } catch (error) {
    console.log("error in connecting db", error);
  }
};

module.exports = connectDB;
