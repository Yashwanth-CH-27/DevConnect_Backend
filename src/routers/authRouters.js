const express = require("express");
const authRouters = express.Router();
const User = require("../models/user");
const brcypt = require("bcrypt");


// saving data to DB by using .save()
authRouters.post("/signUp", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      photoURL,
      skills,
    } = req.body;
    const hashedPassword = await brcypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
      photoURL,
      skills,
      about,
    });
    await user.save();
    res.send("New User Data added Successfully!!");
  } catch (err) {
    res.status(404).send("There was an Error:" + err.message);
  }
});

//Login
authRouters.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const decryptedPassword = await user.decodePassword(password);
    if (!decryptedPassword) {
      throw new Error("Invalid credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfull");
    }
  } catch (err) {
    res.status(404).send("Something went wrong!" + err.message);
  }
});

//logout API
authRouters.post("/logout", async (req,res) => {
    try{
        res.cookie("token", null, {expires: new Date(Date.now())}).send("Logout Successfull")
    }catch (err) {
        res.status(404).send("Error" + err.message);
  }
});

module.exports = authRouters;
