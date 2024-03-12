import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt  from "jsonwebtoken";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,"name is manditory"],   
    },
   
    email:{
        type:String,
        required:[true,"email is manditory"],
        unique:true,
     
    },

    password:{
        type:String,
        required:[true,"email is required !!!"],
        select: false,
    },

    avatar:{
        public_id:{
            type: String,
            required:true,
        },

        url:{
            type:String,
            required: true,
        }
    },

    role:{
        type:String,
        default:"user",
    },

    Newletter:{
        type: Boolean,
        default: false,
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date, 

},{
    timestamps: true
   })
 
userSchema.pre("save", async function(next){
 
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcryptjs.hash(this.password,10)
})
 
// jwt token

    userSchema.methods.getJWTToken = function(){
        return jwt.sign({id:this._id}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRE, });
         
    };

// Check password

userSchema.methods.compairePassword = async function(password){
    return await bcryptjs.compare(password, this.password);

};

// reset password

userSchema.methods.ResetPassword = async function(){
    // generate token

    const resetToken =  crypto.randomBytes(20).toString("hex")
    

    // hashing and add to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;


};
   
   export const  User = mongoose.model("User",userSchema)