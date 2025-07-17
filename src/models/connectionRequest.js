const mongoose = require("mongoose");

const connectionReqSchema = mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: ["intrested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is invalid`
        }
    },

},
{
    timestamps: true,
});

connectionReqSchema.index({fromUserId: 1, toUserId: 1});

connectionReqSchema.pre("save", function(next) {
    const connectionReq = this;
    if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
        throw new Error("Cant send request to yourself")
    }
    next();
})

module.exports = mongoose.model("connectionReqModel", connectionReqSchema)