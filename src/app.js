const express = require("express");

const {adminAuth} = require("./middlewares")

const app = express();

app.use("/admin" ,adminAuth , (req,res) => {
    try{
        throw new Error("Wanted Error")
        res.send("Error sent")
    }
    catch(err){
        res.status(500).send("Something Went wrong!!!")
    }
});
//the below is also a way of error handling it handles all the errors since it matches all the paths,
//this is used at the last of the code flow, but always try to do it using try and catch.
// app.use("/", (err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something Went wrong")
//     }
// });

app.listen(7777, ()=>{
    console.log("Successfully listening on port number 7777...")
});