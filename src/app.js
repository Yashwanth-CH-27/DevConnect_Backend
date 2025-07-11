const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json())

app.post("/signUp", async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save();
        res.send("New User Data added Successfully!!")
    }
    catch(err){
        res.status(404).send("Data has not been added to DB!!!")
    }

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
