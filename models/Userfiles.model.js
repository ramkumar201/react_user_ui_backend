import mongoose from "mongoose";
import UserModel from "./User.model.js";

export const UserfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    },
    file_name: {
        type: String
    },
    file_type: {
        type: String
    },
    file_size: {
        type: String
    },
    file: {
        type: String
    },
}, { timestamps: true })

export default mongoose.model.Userfiles || mongoose.model('userfile', UserfileSchema)