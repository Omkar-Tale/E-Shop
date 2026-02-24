import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
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
            trim: true
        },
        public_id: {
            type: String,
            trim: true
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
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10);
})

// using methods we can define the fuctions 
userSchema.methods = {
    // using for compares passwore
    comparePassword: async function(password){
        return await bcrypt.compare(password, this.password)
    }
}

export const userModel = mongoose.models.User ||  mongoose.model("User", userSchema);

