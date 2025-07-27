const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleware/userAuth")
const connectionReqModel = require("../models/connectionRequest")
const User = require("../models/user")
const USER_SAFE_DATA = "firstName lastName age about photoURL skills";

//getting pending requests from DB
userRouter.get("/user/request/received", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;
        const dataFromDB = await connectionReqModel.find({
            toUserId: loggedInUser._id,
            status: "intrested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.send(dataFromDB)
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

//feed API
userRouter.get("/feed", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 100;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1) * limit;
        const allConnectionReqEntries = await connectionReqModel.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id},
            ]
        });
        const hideThisUsers = new Set();
        allConnectionReqEntries.forEach( entry => {
            hideThisUsers.add(entry.fromUserId.toString()),
            hideThisUsers.add(entry.toUserId.toString())
        } );
        const feedData = await User.find({
            $and: [
                {_id: {$ne : loggedInUser._id}},
                {_id: {$nin: Array.from(hideThisUsers) }}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(feedData);
    }catch(err){
        res.status(404).json({message: err.message})
    }
})


module.exports = userRouter;