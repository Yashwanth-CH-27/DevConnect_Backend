const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleware/userAuth")
const connectionReqModel = require("../models/connectionRequest")
const USER_SAFE_DATA = "firstName lastName age about photoURL skills";

//getting pending requests from DB
userRouter.get("/user/request/received", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;
        const dataFromDB = await connectionReqModel.find({
            toUserId: loggedInUser._id,
            status: "intrested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({message: "These are the connection requests you got!", dataFromDB})
    }
    catch(err){
        res.send("Error: ", err.message)
    }
})

//getting all the connection requests
userRouter.get("/user/connections", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;
        const dataFromDB = await connectionReqModel.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)
        const data = dataFromDB.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
               return row.toUserId;
            }
            return row.fromUserId;
        })
        
        res.json({message: "These are the connections you got!", data})
    }
    catch(err){
        res.send("Error: ", err.message)
    }
})

module.exports = userRouter;