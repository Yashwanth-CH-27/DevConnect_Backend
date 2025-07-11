const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json())

// saving data to DB by using .save()

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

//when you want to find one doc by using emailId use .find, but from duplicates use .findOne

app.get("/user", async (req,res) => {
      const userEmail = req.body.emailId;
      try{
        console.log(userEmail)
          const users = await User.findOne({emailId: userEmail})
          if(!users){
            res.send("User Not found")
          }else{
            res.send(users)
          }
      }
      catch(err){
        res.status(404).send("Something went wrong")
      }
})

// to get all the data or all the docs from DB

app.get("/feed", async (req,res) => {
      try{
          const users = await User.find({})
          if(!users){
            res.send("User Not found")
          }else{
            res.send(users)
          }
      }
      catch(err){
        res.status(404).send("Something went wrong")
      }
})

//to Delete data from Db

app.delete("/user", async (req,res) => {
  const userId = req.body.userId;
  try{
    const removedId = await User.findByIdAndDelete(userId)
    res.send(removedId)
  }
  catch(err){
    res.status(404).send("Something went wrong")
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
