const express = require("express");

const app = express();

//app.user("route", rh1,rh2,rh3...) or
//app.user("route", [rh1,rh2],rh3...) both are same gives you the  same results

app.use("/user", (req,res,next) => {
    console.log("Response 1");
    next();
},
(req,res,next) => {
    console.log("Response 2")
    next();
},
(req,res) => {
    console.log("Response 3")
    res.send("3rd Respone")
},
)


app.listen(7777, ()=>{
    console.log("Successfully listening on port number 7777...")
});