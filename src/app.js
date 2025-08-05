const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouters = require("./routers/authRouters");
const profileRouter = require("./routers/profileRouter");
const requestRouter = require("./routers/requestRouter");
const userRouter = require("./routers/userRouter");
const cors = require("cors");

require("dotenv").config(); // Load .env

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouters);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Successfully listening on port number ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log("DB is not connected!! " + err.message);
  });
