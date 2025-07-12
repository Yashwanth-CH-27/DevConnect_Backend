const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
        lowercase: true
    },
    lastName:{
        type: String,
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
        lowercase: true,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
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

module.exports = mongoose.model("User", userSchema);