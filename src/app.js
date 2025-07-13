const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser())

// saving data to DB by using .save()

app.post("/signUp", async (req, res) => {

  try {
    const {firstName, lastName, emailId, password, age, gender, about, photoURL, skills} = req.body
    const hashedPassword = await brcypt.hash(password, 10)
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
      photoURL,
      skills,
      about
    });
    await user.save();
    res.send("New User Data added Successfully!!");
  } catch (err) {
    res.status(404).send("There was an Error:" + err.message);
  }
});

//Login

app.post("/login", async (req,res) => {
  try{
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid credentials")
    }
    const decryptedPassword = await brcypt.compare(password,user.password)
    if(!decryptedPassword){
      throw new Error("Invalid credentials")
    }
    else{
      const token = await jwt.sign({_id: user._id}, "Pass@Dev279729")
      console.log(token);
      res.cookie("token", token)
      res.send("Login Successfull")
    }
  }
  catch(err){
    res.status(404).send("Something went wrong!"+ err.message)
  } 
})

//to acess user profile

app.get("/profile", async (req,res) => {
 try{
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
      throw new Error("Invalid Token")
    }
    const decodedMessage = await jwt.verify(token, "Pass@Dev279729");
    const {_id} = decodedMessage;
    const user = await User.findById(_id)
    console.log(user)
    if(!user){
      throw new Error("User Not Valid!!")
    }
    res.send("User Found and details are: "+user);
 }
  catch(err){
  res.status(404).send("Something went wrong!"+ err.message)
} 
  
})
 
//when you want to find one doc by using emailId use .find, but from duplicates use .findOne

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log(userEmail);
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.send("User Not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// to get all the data or all the docs from DB

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.send("User Not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//to Delete data from Db

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const removedId = await User.findByIdAndDelete(userId);
    res.send(removedId);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//Update the data in the DB

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const Allowed_Updates = [
      "about",
      "photoURL",
      "skills",
      "age",
      "gender",
    ];
    const isUpdatesAllowed = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k)
    );
    if (!isUpdatesAllowed) {
      throw new Error("Updates not allowed");
    }
    if (data?.skills && data?.skills.length > 10) {
      throw new Error("You can only enter 10 skills max");
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(updatedUser);
  } catch (err) {
    res.status(404).send("There was an Error:" + err.message);
  }
});

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
