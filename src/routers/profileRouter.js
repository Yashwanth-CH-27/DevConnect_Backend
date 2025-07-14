const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth");


profileRouter.get("/profile", userAuth, async (req,res) => {
 try{
    const user = req.user;
    res.send("User Found and details are: "+user);
 }
  catch(err){
  res.status(404).send("Something went wrong!"+ err.message)
}  
});

module.exports = profileRouter;