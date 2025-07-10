const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Yaswanth:Yash%40270821@namastenode.dxuqtrk.mongodb.net/devTinder")
};

module.exports = connectDB;