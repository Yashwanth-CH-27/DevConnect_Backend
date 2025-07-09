const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({firstname : "Ch", lastname : "Yashwanth"});
});

app.post("/user", (req,res) => {
    //details will be saved in DB
    res.send("New User Data has been added successfully!")
});

app.put("/user", (req,res) => {
    res.send("Whole Data has been replaced successfully!")
});

app.patch("/user", (req,res) => {
    
    res.send("Req Data has been updated successfully!")
});

app.delete("/user", (req,res) => {
    res.send("Respectice Data has been deleted successfully!")
});

app.listen(7777, ()=>{
    console.log("Successfully listening on port number 7777...")
});