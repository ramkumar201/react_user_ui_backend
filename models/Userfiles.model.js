import mongoose from "mongoose";

export const UserfileSchema = new mongoose.Schema({
    user_id: {
        type: Number
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
}, { timestamps: true })

export default mongoose.model.Userfiles || mongoose.model('userfile', UserfileSchema)