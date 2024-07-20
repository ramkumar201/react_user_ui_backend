import mongoose from "mongoose";


export const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        required: [true, "Please provide Unique email"],
        unique: [true, "Email already Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    },
    mobile: { type: Number },
    address: { type: String },
    photo: { type: String }
}, { timestamps: true });

export default mongoose.model.Users || mongoose.model('user', UserSchema);