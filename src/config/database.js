const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
