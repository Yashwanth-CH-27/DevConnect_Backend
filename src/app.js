const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hi Human!");
});

app.get("/hello", (req, res) => {
    res.send("Hello Human!");
});

app.get("/whatsup", (req, res) => {
    res.send("whatsup");
});

app.listen(7777, ()=>{
    console.log("Successfully listening on port number 7777...")
});