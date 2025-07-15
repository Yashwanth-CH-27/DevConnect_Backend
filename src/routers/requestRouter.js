const express = require("express");
const userAuth = require("../middleware/userAuth");
const connectionReqModel = require("../models/connectionRequest");
const User = require("../models/user")
const requestRouter = express.Router();

//connection req with status API
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["intrested", "ignored"];

        const isStatusValid = allowedStatus.includes(status);
        if(!isStatusValid){
            throw new Error("Invalid Status")
        }
        const isIdValid = await User.findById(toUserId);
        if(!isIdValid){
            throw new Error("Invalid Id, User not found")
        }
        const isReqValid = await connectionReqModel.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(isReqValid){
            throw new Error("Invalid request, request already made or cant send req to the person who already sent you a request!")
        }

        const connectionReq = new connectionReqModel({
            fromUserId,
            toUserId,
            status,
        })
        const data =  await connectionReq.save();
        res.json({message: req.user.firstName+" "+status+" "+isIdValid.firstName, data});
    }catch(err){
        res.status(400).send("Error: " + err.message)
    }
})


module.exports = requestRouter;

