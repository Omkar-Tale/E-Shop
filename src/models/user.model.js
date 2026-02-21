import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        select: false,
        trim: true
    },
    avatar: {
        url: {
            type: String,
            trim: ture
        },
        public_id: {
            type: String,
            trim: ture
        }
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    deleteAt: {
        type: Date,
        default: null,
        index: true
    }
},{
    timestamps: true
})

// using hooks we wil setup hashing and password compares logic\
// using save and pre after modifying the password it will hash
userSchema.pre("save", async(next)=>{
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// using methods we can define the fuctions 
userSchema.methods({
    // using for compares passwore
    comparePassword: async(password)=>{
        return await bcrypt.compare(password, this.password)
    }
})

export const userModel = mongoose.model("user", userSchema)

