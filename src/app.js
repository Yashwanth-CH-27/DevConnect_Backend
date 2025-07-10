const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signUp", async (req,res) => {
    const user = new User({
        firstName: "Chundru",
        lastName: "Yaswanth Sai Kiran",
        emailId: "yash@gmail.com",
        password: "yash@123",
    })
    await user.save();
    res.send("New User Data added Successfully!!")
})

connectDB()
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(7777, () => {
      console.log("Successfully listening on port number 7777...");
    });
  })
  .catch((err) => {
    console.log("DB is not connected!!");
  });
