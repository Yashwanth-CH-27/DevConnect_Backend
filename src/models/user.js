const mongoose = require("mongoose");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid Email")
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a valid Password")
            }
        }   
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type: String,
        
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error("You should enter a valid gender that is either male,female or others")
            }
        }
    },
    photoURL:{
        type: String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdoEchPPs6qsqS7qKPO974Wp1O6T9abqnfA&s"
    },
    about:{
       type: String,
       default: "This is the default Bio until you add your own bio" 
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true
}
)

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "Pass@Dev279729", {expiresIn : '1d'})
    return token;
}

userSchema.methods.decodePassword = async function (password) {
    const user = this;
    const decryptedPassword = await bcrypt.compare(password,user.password)
    return decryptedPassword;
}

module.exports = mongoose.model("User", userSchema);