const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouters = require("./routers/authRouters");
const profileRouter = require("./routers/profileRouter");
const requestRouter = require("./routers/requestRouter");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouters);
app.use("/",profileRouter);
app.use("/",requestRouter);



connectDB()
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(7777, () => {
      console.log("Successfully listening on port number 7777...");
    });
  })
  .catch((err) => {
    console.log("DB is not connected!!"+err.message);
  });
