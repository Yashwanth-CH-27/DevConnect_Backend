const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config(); // Load env variables

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login or SignUp");
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    const { _id } = decodedToken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = userAuth;
