const express = require("express");

const app = express();

app.get("/ab*c", (req, res) => {
    res.send("Anything between ab and c can be given")
});

app.get(/a/, (req, res) => {
    res.send("Anything with a in the string")
});

app.get("/user", (req,res) => {
    console.log(req.query)
    res.send("Anything in the path like /user?userid=value can be given that will be given in the above console log")
})

app.get("/user/:userid", (req,res) => {
    console.log(req.params)
    res.send("predefine the id like you dont need give a query, direclty you can give /user/value that value will be the userid")
})

app.get("/user/:userid/:password", (req,res) => {
    console.log(req.params)
    res.send("predefine the id like you dont need give a query, direclty you can give /user/value/passvalues that values will be the userid and password")
})


app.listen(7777, ()=>{
    console.log("Successfully listening on port number 7777...")
});