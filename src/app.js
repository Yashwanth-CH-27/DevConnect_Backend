const express = require("express");

const {adminAuth} = require("./middlewares")

const app = express();

app.use("/admin" ,adminAuth , (req,res) => {
    res.send("Data sent")
});



app.listen(7777, ()=>{
    console.log("Successfully listening on port number 7777...")
});