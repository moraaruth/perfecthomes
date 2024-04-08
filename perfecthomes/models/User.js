import {Schema, model, models }  from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: true,
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],

    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    


}, {
    timestamps: true
})

const User = models.user || model("users", userSchema);


export default User;