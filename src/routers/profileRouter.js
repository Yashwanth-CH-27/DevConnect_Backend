const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth");
const updateValidator = require("../utils/updateValidator")

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

module.exports = profileRouter;