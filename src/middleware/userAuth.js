const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req,res,next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Please Login!");
        }
        const decodedToken = await jwt.verify(token, "Pass@Dev279729", {expiresIn : '1d'})
        const {_id} = decodedToken;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(404).send("Error: "+ err.message)
    }
}

module.exports = userAuth;