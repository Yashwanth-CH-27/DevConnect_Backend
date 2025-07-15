const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth");
const updateValidator = require("../utils/updateValidator")
const bcrypt = require("bcrypt");

//profile view API
profileRouter.get("/profile/view", userAuth, async (req,res) => {
 try{
    const user = req.user;
    res.send("User Found and details are: "+user);
 }
  catch(err){
  res.status(404).send("Something went wrong!"+ err.message)
}  
});

//profile update API
profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
    try{
        if(!updateValidator(req)){
            throw new Error("Invalid Updates");
        }
        const loggedInuser = req.user;
        Object.keys(req.body).forEach(key => loggedInuser[key] = req.body[key]);
        await loggedInuser.save();
        res.send(loggedInuser);
    }catch(err){
    res.status(404).send("Something went wrong!"+ err.message)
    } 
});

//profile edit password API
profileRouter.patch("/profile/edit/password", userAuth, async (req,res) => {
    try{
        const {currentPassword} = req.body;
        const user = req.user;
        const isPasswordValid = await bcrypt.compare(currentPassword,user.password);
        if(!isPasswordValid){
            throw new Error("Password is not matching!");
        }
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedPassword
        await user.save();
        res.send("Updation successfull!!")
      }
      catch(err){
        res.status(404).send("Error: "+ err.message);
      }
})

module.exports = profileRouter;